/**
 * @author QIN Fen
 * @email hellowd93@gmail.com
 * @create date 2019-05-22 15:23:00
 * @modify date 2022-11-01 17:22:35
 * @desc 菜单栏组件
 */
import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import history from '_history'
import styled, { createGlobalStyle } from 'styled-components'
import menuIconMap from '../../../assets/menu'
import { Popover } from 'antd'
import { Map } from 'immutable'
import SetPageTitle from '../SetPageTitle'
import cx from 'classnames'
import MenuBadge from './Badge'
import getPathInfo from '../getPathInfo'
import Before from './Before'
import After from './After'
import theme from '../../../theme'

const StyledMenu = styled.div`
  background: ${({ theme }) => theme.color.bg};
  &:not(.fold) {
    .unfold_hide-icon {
      span.icon {
        visibility: hidden;
      }
    }
  }
`
const menuCommon = () => `
  margin: 0;
  list-style-type: none;
  padding: 0;
  background: #fff;
  li {
    padding: 5px 0;
    a {
      color: #777;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      &.child {
        display: flex;
        align-items: center;
        width: 100%;
        font-size: 13px;
        transition: all ease-in 200ms;
        padding: 5px 0 5px 0;
        .icon {
          margin-right: 5px;
        }
      }
    }
  }
`
// const getRadius = (theme) => theme.radius
const getRadius = (theme) => theme.borderRadius

const StyledTopMenu = styled.ul`
  ${menuCommon};
  border-bottom-right-radius: ${({ theme }) => getRadius(theme)};
`
const StyledCurrentMenu = styled.ul`
  ${menuCommon};
  background: transparent;
  a {
    &.father,
    &.child.active {
      color: ${({ theme }) => theme.color.primary};
    }
  }
`
const StyledBottomMenu = styled.ul`
  ${menuCommon};
  border-top-right-radius: ${({ theme }) => getRadius(theme)};
`
const StyledTopBlock = styled.div`
  height: 20px;
  border-bottom-right-radius: ${({ theme, $showRadius }) => ($showRadius ? getRadius(theme) : 0)};
  background: #fff;
`
const StyledBottomBlock = styled.div`
  height: 20px;
  border-top-right-radius: ${({ theme, $showRadius }) => ($showRadius ? getRadius(theme) : 0)};
  background: #fff;
`
const StyledMenuIcon = styled.span`
  display: inline-block;
  background-image: ${({ title, icon }) =>
    `url(${menuIconMap?.[`${icon || title}_grey`] || menuIconMap?.[`${icon || title}`]})`};
  background-repeat: no-repeat;
  width: 18px;
  height: 18px;
  background-size: 100%;
  margin-right: 10px;
  &.current {
    background-image: ${({ title, icon }) => `url(${menuIconMap?.[`${icon || title}`]})`};
  }
  &[title='达人投放记录'] {
    transform: scale(1.2);
  }
`
const UnFoldFatherRow = styled.div`
  a {
    display: flex;
    align-items: center;
    padding: 5px 0 5px 35px;
  }
`

const FoldFatherRow = styled.div`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    min-height: 32px;
  }
`

const UnFoldChildRow = styled.div`
  padding-left: 76px;
`

const FoldChildRow = styled.div`
  a {
    font-size: 13px !important;
    padding: 5px 20px 5px 20px !important;
    text-indent: 0 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-start;
    &:hover {
      background: #eee;
    }
  }
`
const StyledFoldMenuChildWrap = createGlobalStyle`
  .ant-popover-inner-content {
    padding: 5px 0;
  }
`

export class Menus extends Component {
  static propTypes = {
    location: PropTypes.object,
    pathMap: PropTypes.object,
    site: PropTypes.object,
    routes: PropTypes.array,
    menuFold: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.unHistory = history.listen(() => {
      this.upToTop()
    })
  }

  componentWillUnmount() {
    this.unHistory()
  }

  upToTop = () => {
    const scrollTop = document.documentElement.scrollTop
    if (scrollTop > 0) {
      // TODO: scroll to view
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { location = {}, routes, menuFold, pathMap } = this.props
    const currentPath = location.pathname

    // 筛掉隐藏，拒绝访问，和非当前布局的路由
    const filterRoutes = routes
      .map((item) => {
        if (!item.hide && item.access && item.layout?.includes('menuLeft')) {
          const { children } = item
          const itemRoute = {
            ...item,
          }
          if (children && children.length) {
            itemRoute.children = children.filter(
              (child) => !child.hide && child.access && child.layout?.includes('menuLeft'),
            )
          }
          // console.log(itemRoute)
          return itemRoute
        }
        return false
      })
      .filter((i) => i)

    // 给routes分组
    const isCurrentPathRegex = (path) => {
      // const regexp = new RegExp(`${path}/?`)
      // return regexp.test(currentPath)
      // console.log(path, pathMap, currentPath)
      const pathInfo = getPathInfo(pathMap, currentPath)
      return path === pathInfo?.rootPath
    }
    let currentMenuIdx = -1
    filterRoutes.forEach((route, idx) => {
      if (isCurrentPathRegex(route.path)) {
        currentMenuIdx = idx
      }
    })

    // console.log(filterRoutes, currentMenuIdx, currentPath, pathMap)

    const topMenuList = currentMenuIdx > -1 ? filterRoutes.slice(0, currentMenuIdx) : []
    const currentMenu = currentMenuIdx > -1 ? [filterRoutes[currentMenuIdx]] : []
    const bottomMenuList = filterRoutes.slice(currentMenuIdx + 1)

    const renderMenu = (menuList = [], current) => {
      return menuList.map((menu = {}, menuIdx) => {
        const { exact, path, children = [], badgeCounts = 0, before, after, className } = menu
        const menuTitle = menu.menuTitle || menu.title
        return menu.path ? (
          <li
            key={menuIdx}
            className={cx({
              [className]: !!className,
            })}
          >
            {menuFold ? (
              <FoldFatherRow>
                {children.length ? (
                  <Popover
                    placement="right"
                    overlayClassName="menufoldChildWrap"
                    content={
                      <FoldChildRow>
                        <StyledFoldMenuChildWrap />
                        {[Map(menu).delete('children').toJS()].concat(children).map((child, childIdx) => {
                          const childMenuTitle = child.menuTitle || child.title
                          return (
                            <NavLink
                              key={childIdx}
                              exact={!!child.exact}
                              to={child.path}
                              className="child"
                              title={childMenuTitle}
                            >
                              {child.icon && (
                                <StyledMenuIcon
                                  title={childMenuTitle}
                                  icon={child.icon}
                                  className={cx({
                                    icon: true,
                                    current,
                                  })}
                                />
                              )}
                              {childMenuTitle}
                            </NavLink>
                          )
                        })}
                      </FoldChildRow>
                    }
                  >
                    <NavLink exact={!!exact} to={path} className="father">
                      <StyledMenuIcon
                        title={menuTitle}
                        className={cx({
                          icon: true,
                          current,
                        })}
                      />
                    </NavLink>
                  </Popover>
                ) : (
                  <NavLink exact={!!exact} to={path} className="father">
                    <MenuBadge counts={badgeCounts} icon>
                      <StyledMenuIcon
                        title={menuTitle}
                        className={cx({
                          icon: true,
                          current,
                        })}
                      />
                    </MenuBadge>
                  </NavLink>
                )}
              </FoldFatherRow>
            ) : (
              <>
                <Before name={before} />
                <UnFoldFatherRow>
                  <NavLink exact={!!exact} to={path} className="father">
                    <StyledMenuIcon
                      title={menuTitle}
                      className={cx({
                        icon: true,
                        current,
                      })}
                    />
                    <MenuBadge counts={badgeCounts}>
                      <span className="father-title">{menuTitle}</span>
                    </MenuBadge>
                  </NavLink>
                </UnFoldFatherRow>
                <UnFoldChildRow>
                  {children.map((child, childIdx) => {
                    const childMenuTitle = child.menuTitle || child.title
                    return (
                      <NavLink key={childIdx} exact={!!child.exact} to={child.path} className="child">
                        {/* 使用pathMap - trackPath进行路径判定 */}
                        {child.icon && (
                          <StyledMenuIcon
                            title={childMenuTitle}
                            icon={child.icon}
                            className={cx({
                              icon: true,
                              current,
                            })}
                          />
                        )}
                        {childMenuTitle}
                      </NavLink>
                    )
                  })}
                </UnFoldChildRow>
                <After name={after} />
              </>
            )}
          </li>
        ) : null
      })
    }

    return (
      <StyledMenu
        className={cx({
          fold: menuFold,
        })}
      >
        <SetPageTitle />
        <StyledTopBlock $showRadius={!topMenuList.length} />
        {!!topMenuList.length && <StyledTopMenu>{renderMenu(topMenuList)}</StyledTopMenu>}
        <StyledCurrentMenu>{renderMenu(currentMenu, true)}</StyledCurrentMenu>
        {!!bottomMenuList.length && <StyledBottomMenu>{renderMenu(bottomMenuList)}</StyledBottomMenu>}
        <StyledBottomBlock $showRadius={!bottomMenuList.length} />
      </StyledMenu>
    )
  }
}

function mapStateToProps({
  auth: {
    account: { account_type },
  },
  config: { site, menu },
  init: { routes, pathMap },
}) {
  return {
    account_type,
    site,
    routes,
    pathMap,
    menuFold: menu?.fold,
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Menus))
