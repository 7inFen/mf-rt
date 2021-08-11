/* eslint-disable max-params */
import React, { useState, useEffect } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  fetchOrganizationList,
  fetchUserList,
  // updateOrganizationData
} from '../actions/organization'
import quickSort from '../utils/quickSort'
import Immutable from 'immutable'
import mapKeys from '../utils/mapKeys'

export const ROOT_ID = 'root'
export const CEO_ID = 'ceo'
export const CEO_ORDER = '0'
export const CEO_NAME = 'CEO'
export const CEO_USER_NAME = '尹佳君'
export const CEO_NODE = {
  id: CEO_ID,
  name: CEO_NAME,
  isCEO: true,
  order: CEO_ORDER,
  userList: [
    {
      nodeId: CEO_ID,
      id: CEO_ID,
      name: CEO_USER_NAME,
      isLeader: true,
    },
  ],
}

export const popularData = (
  dataList = [],
  organizationMapUser = {},
  father = {},
  level = 0,
  organizationMap = {},
  userMap = {},
) => {
  const list = []
  dataList.forEach((item, idx) => {
    const { id, name, children = [] } = item
    const pathId = (father?.pathId || []).concat(id)
    const pathName = (father?.pathName || []).concat(name)
    const userList = organizationMapUser[id] || []
    const group = level === 0 ? 'ceo' : level === 1 ? idx : father.group
    const order = `${father?.order || ''}${idx}`
    // 是否有子节点
    const isLeaf = !children?.length
    if (!isLeaf) {
      item.children = popularData(
        children,
        organizationMapUser,
        {
          pathId,
          pathName,
          group,
          order,
          ...item,
        },
        level + 1,
        organizationMap,
        userMap,
      )
    }

    const userSortedList = quickSort(
      userList.map((item) => ({
        ...item,
        sortKey: item.isLeader ? 1 : 0,
      })),
      {
        key: 'sortKey',
      },
    ).map((user) => Immutable.Map(user).delete('sortKey').toJS())

    const itemData = {
      ...item,
      order,
      pathId,
      pathName,
      isLeaf: isLeaf,
      fatherId: father.id || ROOT_ID,
      childrenId: isLeaf ? [] : children.map((child) => child.id),
      level,
      userList: userSortedList,
      group,
    }

    userSortedList.forEach((item) => {
      userMap[item.id] = itemData
    })

    list.push(itemData)
    organizationMap[id] = itemData
  })

  if (level === 0) {
    return {
      list,
      organizationMap,
      userMap,
    }
  }
  return list
}

export const popularOrganization = (organizationMap, userMap) => {
  // console.log(organizationMap, userMap)
  const popularOrganizationMap = {}
  for (const organizationId in organizationMap) {
    if (Object.hasOwnProperty.call(organizationMap, organizationId)) {
      const userAllMap = {}
      const leaderMap = {}
      const organizationItem = organizationMap[organizationId]
      popularOrganizationMap[organizationId] = organizationItem
      const { pathId = [], childrenId } = organizationItem
      // 取leaderMap 和 userAllMap
      // pathId 第一项为ceo
      // 从第二项开始取 leader
      // organization 的 pathId
      pathId.slice(1).forEach((nodeId) => {
        const { userList = [], level } = organizationMap[nodeId] || {}
        userList.forEach((user) => {
          userAllMap[user.id] = {
            ...user,
            level,
          }
          // 2021-06-16 不计入三级部门（客户执行一组、二组）的成员leader
          // if (user.isLeader && level < 3) {
          if (user.isLeader) {
            leaderMap[user.id] = {
              ...user,
              level,
            }
          }
        })
      })
      // user 的 pathId
      for (const userId in userMap) {
        if (Object.hasOwnProperty.call(userMap, userId)) {
          const { pathId = [] } = userMap[userId]
          if (pathId.includes(organizationId)) {
            userMap[userId].userList.forEach((user) => {
              userAllMap[user.id] = {
                ...userAllMap?.[user.id],
                ...user,
              }
            })
          }
        }
      }
      popularOrganizationMap[organizationId].userAllList = Object.keys(userAllMap).map((id) => userAllMap[id])
      popularOrganizationMap[organizationId].leaderList = Object.keys(leaderMap).map((id) => leaderMap[id])

      const childrenAllList = []
      const getChildrenList = (list, idList) => {
        idList.forEach((id) => {
          const organizationItem = organizationMap[id]
          const { childrenId = [] } = organizationItem
          if (childrenId.length) {
            getChildrenList(list, childrenId)
          }
          // TODO 数据量过大时可精简
          list.push({
            ...organizationItem,
          })
        })
        return list
      }
      getChildrenList(childrenAllList, childrenId)
      popularOrganizationMap[organizationId].childrenAllList = childrenAllList
    }
  }
  return popularOrganizationMap
}

export default function useOrganization(props) {
  // const dispatch = useDispatch()
  // const organizationDataInStore = useSelector((store) => store.organization.data)
  // const needFetchInitial = !organizationDataInStore.list?.length
  // const { tick: _tick = needFetchInitial, params } = props || {}
  const { tick: _tick = true, params } = props || {}
  const [tick, setTick] = useState()
  const { isAll = '0' } = params || {}

  useEffect(() => {
    if (tick !== _tick) {
      setTick(_tick)
    }
  }, [_tick])

  useEffect(() => {
    if (tick) {
      fetchData()
    }
  }, [tick])

  const [organizationData, setOrganizationData] = useState({
    loading: false,
    list: [],
    fresh: false,
  })
  const [userData, setUserData] = useState({
    loading: false,
    list: [],
    fresh: false,
  })

  const fetchData = () => {
    // 取组织列表
    setOrganizationData({
      ...organizationData,
      loading: true,
    })
    fetchOrganizationList(
      {
        isAll,
      },
      (list) => {
        setOrganizationData({
          ...organizationData,
          loading: false,
          list,
          fresh: true,
        })
      },
      () => {
        setOrganizationData({
          ...organizationData,
          loading: false,
        })
        setTick(false)
      },
    )()

    // 取用户列表
    setUserData({
      ...userData,
      loading: true,
    })
    fetchUserList(
      { isAll },
      (list) => {
        setUserData({
          ...userData,
          loading: false,
          list,
          fresh: true,
        })
      },
      () => {
        setUserData({
          ...userData,
          loading: false,
        })
        setTick(false)
      },
    )()
  }

  const initialData = {
    list: [],
    organizationMap: {},
    userList: [],
    userMap: {},
    userMapByName: {},
    // ...organizationDataInStore,
  }

  const [data, setData] = useState(initialData)

  useEffect(() => {
    if (organizationData.fresh && userData.fresh) {
      setOrganizationData({
        ...organizationData,
        fresh: false,
      })
      setUserData({
        ...userData,
        fresh: false,
      })

      const organizationMapUser = userData.list.reduce((prev, curr) => {
        const { nodeId } = curr
        prev[nodeId] = (prev?.[nodeId] || []).concat(curr)
        return prev
      }, {})
      const { list, organizationMap, userMap, ...rest } = popularData(
        [
          {
            ...CEO_NODE,
            children: organizationData.list,
          },
        ],
        {
          ...organizationMapUser,
          [CEO_NODE.id]: CEO_NODE.userList,
        },
      )

      const organizationMapWithUserAllList = popularOrganization(organizationMap, userMap)
      const userList = organizationMapWithUserAllList?.ceo?.userAllList || []
      const updateData = {
        ...data,
        ...rest,
        list,
        organizationMap: organizationMapWithUserAllList,
        userList,
        userMap: mapKeys(userList, {
          key: 'id',
          mapAll: true,
        }),
        userMapByName: mapKeys(userList, {
          key: 'name',
          mapAll: true,
        }),
      }
      setData(updateData)
      // dispatch(updateOrganizationData(updateData))
    }
  }, [organizationData, userData])

  console.log(data)

  return {
    loading: organizationData.loading && userData.loading,
    ...data,
  }
}

useOrganization.propTypes = {}
