/**
 * @author QIN Fen
 * @email fen.qin@mediafull.cn
 * @create date 2020-02-17 18:19:20
 * @modify date 2021-04-21 14:37:35
 * @desc 消息通知本体
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Row, Col, Select, Icon, Skeleton, Badge, Popover, Spin } from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import cx from 'classnames'
import { fetchList, fetchMap, readNotice, deleteNotice } from '../../actions/notice'
import { AutoSizer, List, InfiniteLoader } from 'react-virtualized'
import Modal from '../Modal'
import noticeConfig from '../../../config/notice'
import { px2vw } from '../../utils/styled-px2vw'
import emptyIcon from '../../assets/icon/暂无记录@2x.png'
import { SelectSuffixIcon } from '../../styled/suffixIcon'
import { ModalContent } from '../../styled/Modal'

const StyledBadge = styled(Badge)`
  cursor: pointer;
  sup {
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    line-height: 18px;
    .current {
      transform: scale(0.9);
    }
  }
  margin-right: 40px;
  /* transform: translateX(-20px); */
`
const StyledIcon = styled(Icon)`
  font-size: 24px;
`
const StyledPopover = createGlobalStyle`
  .notice-popover {
    .ant-popover-title {
      border: none;
      font-size: ${px2vw(18)};
      color: #2F4261;
      display: flex;
      align-items: center;
      &:before {
        content: '';
        width: 2px;
        height: ${px2vw(25)};
        background: #01204A;
        display: block;
        margin-right: 7px;
      }
      padding: ${px2vw(30)} ${px2vw(30)} 0 ${px2vw(30)};
    }
    .ant-popover-inner-content {
      padding: 0 ${px2vw(30)} ${px2vw(30)} ${px2vw(30)};
    }
  }
`

const Wrap = styled.div`
  width: 676px;
`
const Head = styled(Row)`
  margin: 20px 0;
`
const TabItem = styled.span`
  color: #002766;
  font-size: 24px;
  cursor: pointer;
  margin-right: 40px;
  &.current {
    color: #002766;
    font-weight: bold;
  }
`
const Right = styled(Col)`
  display: flex;
  /* text-align: right; */
  align-items: center;
  justify-content: flex-end;
  & > .ant-select {
    width: 196px;
    margin-right: 30px;
  }
  .anticon-setting {
    color: #0171c3;
    font-size: 24px;
  }
`
const Tools = styled.div`
  margin-right: 10px;
  padding: 7px 20px;
  background: #f2f8fb;
  box-shadow: 1px 2px 4px 2px rgba(0, 0, 0, 0.07);
  border-radius: 4px;
  span {
    color: #0171c3;
    font-size: 16px;
    cursor: pointer;
    &.delete {
      &:after {
        content: '|';
        margin: 0 7px;
        color: #0171c3;
      }
    }
  }
`
const Content = styled.div`
  /* margin-top: 20px; */
`
const ItemRow = styled.div`
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
`
const ItemName = styled.div`
  flex: 3;
  font-size: 20px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 30px;
  color: #2f4261;
  cursor: pointer;
  &.unread {
    color: #0171c3;
  }
  &.lineThrough {
    text-decoration: line-through;
  }
`
const ItemType = styled.div`
  flex: 1;
  font-size: 16px;
  color: #2f4261;
  padding-right: 20px;
  &.unread {
    color: #014f89;
  }
  /* text-align: center; */
`
const ItemDate = styled.div`
  flex: 1;
  text-align: right;
  font-size: 16px;
  color: #2f4261;
  padding-left: 10px;
  &.unread {
    color: #014f89;
  }
`
const DeleteContent = styled.span`
  &,
  * {
    font-size: 20px;
    font-weight: bold;
  }
`
const Empty = styled.div`
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  span {
    color: #0171c3;
    font-size: 18px;
    margin-top: 10px;
  }
`
const EmptyIcon = styled.div`
  width: 68px;
  height: 88px;
  background-image: url(${emptyIcon});
  background-repeat: no-repeat;
  background-size: 100%;
  background-position: center;
`

const TABS = [
  {
    key: 'unread',
    name: '未读消息',
  },
  {
    key: 'all',
    name: '全部消息',
  },
]

export default connect(
  (state) => ({
    list: state.notice.list,
    pagination: state.notice.pagination,
    map: state.notice.map,
    unread: state.notice.unread,
    listLoading: state.notice.listLoading,
  }),
  {
    fetchList,
    fetchMap,
    readNotice,
    deleteNotice,
  },
)(
  class NoticeContent extends Component {
    static propTypes = {
      fetchList: PropTypes.func,
      list: PropTypes.array,
      pagination: PropTypes.object,
      map: PropTypes.object,
      fetchMap: PropTypes.func,
      readNotice: PropTypes.func,
      deleteNotice: PropTypes.func,
      unread: PropTypes.number,
      listLoading: PropTypes.bool,
    }

    constructor(props) {
      super(props)

      this.state = {
        mode: 'unread',
        type: undefined,
        showInfoModal: false,
        modalTitle: '',
        modalContent: '',
        showDeleteModal: false,
        showTools: false,
        showNoticeContent: false,
        updateAt: '',
      }
      this.noticeId = ''
      this.fetchTask = null
      this.fetchIntervalTime = 30000
    }

    componentDidMount() {
      this.fetchData()
      this.props.fetchMap()
      this.setFetchTask()
    }

    componentWillUnmount() {
      this.clearFetchTask()
    }

    setFetchTask = () => {
      this.fetchTask = setInterval(() => {
        this.fetchData({
          _task: true,
        })
      }, this.fetchIntervalTime)
    }

    clearFetchTask = () => {
      if (this.fetchTask) {
        clearInterval(this.fetchTask)
      }
    }

    fetchData = (params) => {
      const { mode, type } = this.state
      const { fetchList, pagination } = this.props
      const { current, pageSize } = pagination
      fetchList(
        {
          mode,
          type: type || 'all',
          current,
          pageSize,
          ...params,
        },
        () => {
          this.setState({
            updateAt: Date.now(),
          })
          this.clearFetchTask()
          this.setFetchTask()
        },
      )
    }

    handleTabClick = (mode) => {
      this.setState({
        mode,
        type: undefined,
      })
      this.fetchData({
        mode,
        type: 'all',
        current: 1,
      })
    }

    handleItemClick = (info) => {
      const { readNotice } = this.props
      const { id, name, content, unread, no_id } = info
      this.noticeId = no_id
      if (unread) {
        readNotice({
          type: 'single',
          id,
        })
      }
      this.setState({
        showInfoModal: true,
        modalTitle: name,
        modalContent: <ModalContent>{content}</ModalContent>,
      })
    }

    rowRenderer = ({ key, style, index }) => {
      const { list, map } = this.props
      const itemInfo = list[index]
      // console.log(list)
      if (itemInfo) {
        const { name, type, date, important, unread } = itemInfo
        return (
          <ItemRow key={key} style={style}>
            <ItemName
              className={cx({
                red: important,
                bold: unread,
                unread,
                lineThrough: !unread,
              })}
              onClick={() => this.handleItemClick(itemInfo)}
            >
              {name}
            </ItemName>
            <ItemType
              className={cx({
                unread,
              })}
            >
              {map?.keyValue?.[type] || ''}
            </ItemType>
            <ItemDate
              className={cx({
                unread,
              })}
            >
              {date}
            </ItemDate>
          </ItemRow>
        )
      } else {
        return (
          <ItemRow key={key} style={style}>
            <ItemName>
              <Skeleton active title paragraph={false} />
            </ItemName>
            <ItemType>
              <Skeleton active title paragraph={false} />
            </ItemType>
            <ItemDate>
              <Skeleton active title paragraph={false} />
            </ItemDate>
          </ItemRow>
        )
      }
    }

    handleRowLoaded = ({ index }) => {
      const { list } = this.props
      return !!list[index]
    }

    loadMoreRows = ({ startIndex, stopIndex }) => {
      const {
        list,
        pagination: { pageSize },
      } = this.props
      const current = Math.ceil(stopIndex / pageSize)
      if (!list[(current - 1) * pageSize]) {
        this.fetchData({
          current,
        })
      }
    }

    handleSelectChange = (type) => {
      this.setState({
        type,
      })
      this.fetchData({
        type: type || 'all',
        current: 1,
      })
    }

    toogleInfoModal = (status) => {
      this.setState({
        showInfoModal: status,
      })
      if (!status) {
        this.noticeId = ''
      }
    }

    toogleDeleteModal = (status) => {
      this.setState({
        showDeleteModal: status,
      })
    }

    handleNotice = () => {
      const noticeId = this.noticeId
      if (noticeId) {
        const [id, type = '1'] = noticeId.split(',')
        // console.log(id, type, noticeId)
        const link = noticeConfig[id][Number(type) - 1]
        window.open(link)
        this.toogleInfoModal(false)
      }
    }

    toogleTools = () => {
      this.setState({
        showTools: !this.state.showTools,
      })
    }

    handleDeleteAll = () => {
      // TODO: 选择任务类型后全部删除，删除的是该任务类型下的，还是全部？
      const { deleteNotice } = this.props
      deleteNotice(
        {
          type: 'all',
        },
        () => {
          this.fetchData({
            current: 1,
          })
          this.setState({
            showTools: false,
            showDeleteModal: false,
            type: undefined,
          })
        },
      )
    }

    handleReadAll = () => {
      const { readNotice } = this.props
      readNotice(
        {
          type: 'all',
        },
        () => {
          this.fetchData({
            current: 1,
          })
          this.setState({
            showTools: false,
            type: undefined,
          })
        },
      )
    }

    toogleNoticeContent = () => {
      this.setState({
        showNoticeContent: !this.state.showNoticeContent,
      })
    }

    render() {
      const {
        mode,
        type,
        showInfoModal,
        modalTitle,
        modalContent,
        showDeleteModal,
        showTools,
        showNoticeContent,
        updateAt,
      } = this.state
      const { map, pagination, unread, listLoading } = this.props
      const { total = 0 } = pagination
      // console.log(list, pagination)
      const popoverContent = (
        <Wrap>
          <Head>
            <Col span={12}>
              {TABS.map((item) => (
                <TabItem
                  key={item.key}
                  onClick={() => this.handleTabClick(item.key)}
                  className={cx({
                    current: mode === item.key,
                  })}
                >
                  {item.name}
                </TabItem>
              ))}
            </Col>
            <Right span={12}>
              {showTools ? (
                <Tools>
                  {mode === 'all' && (
                    <span className="red delete" onClick={() => this.toogleDeleteModal(true)}>
                      全部删除
                    </span>
                  )}
                  <span onClick={this.handleReadAll}>全部已读</span>
                </Tools>
              ) : (
                <Select
                  value={type}
                  placeholder="全部任务类型"
                  onChange={this.handleSelectChange}
                  allowClear
                  suffixIcon={<SelectSuffixIcon />}
                >
                  {(map?.list || []).map((item, key) => (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              )}
              <Icon type="setting" onClick={this.toogleTools} />
            </Right>
          </Head>
          <Content>
            <Spin spinning={listLoading}>
              {total === 0 ? (
                <Empty>
                  <div>
                    <EmptyIcon />
                    <span>{mode === 'all' ? '暂无消息' : '暂无未读消息'}</span>
                  </div>
                </Empty>
              ) : (
                <InfiniteLoader
                  isRowLoaded={this.handleRowLoaded}
                  loadMoreRows={this.loadMoreRows}
                  rowCount={total}
                  threshold={3}
                >
                  {({ onRowsRendered }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => (
                        <List
                          // ref='List'
                          // className={styles.List}
                          height={250}
                          // overscanRowCount={overscanRowCount}
                          // noRowsRenderer={this._noRowsRenderer}
                          onRowsRendered={onRowsRendered}
                          rowCount={total}
                          rowHeight={50}
                          rowRenderer={this.rowRenderer}
                          // scrollToIndex={scrollToIndex}
                          width={width}
                          updateAt={updateAt}
                        />
                      )}
                    </AutoSizer>
                  )}
                </InfiniteLoader>
              )}
            </Spin>
          </Content>
        </Wrap>
      )
      return (
        <>
          <StyledPopover />
          <Popover
            title="消息提醒"
            content={popoverContent}
            visible={showNoticeContent}
            // trigger='click'
            placement="bottomLeft"
            getPopupContainer={() => document.getElementById('app')}
            overlayClassName="notice-popover"
          >
            <StyledBadge count={unread} offset={[1, -1]} onClick={this.toogleNoticeContent}>
              <StyledIcon type="bell" />
            </StyledBadge>
          </Popover>

          <Modal
            visible={showInfoModal}
            title={modalTitle}
            onCancel={() => this.toogleInfoModal(false)}
            zIndex={999999}
            showCancelBtn={false}
            okText="去处理"
            onOk={this.handleNotice}
          >
            {modalContent}
          </Modal>
          <Modal
            visible={showDeleteModal}
            title="删除确认"
            onCancel={() => this.toogleDeleteModal(false)}
            zIndex={999999}
            onOk={this.handleDeleteAll}
          >
            <DeleteContent>
              确定<span className="red">删除全部</span>通知消息吗？
            </DeleteContent>
          </Modal>
        </>
      )
    }
  },
)
