/**
 * 保持表格排序状态
 */

import React, { forwardRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import StyledTable, { StyledFixedTable } from '../styled/table'
import { setThousands } from '../utils/parseNumber'
import Tooltip from './TooltipQuestion'
import Tp from './Tp'
import styled from 'styled-components'
import cx from 'classnames'
import { throttle } from '../utils/debounce'
import Immutable from 'immutable'

const StyledTitleWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  white-space: nowrap;
  height: 100%;
`
// const StyledTitleWithTooltip = styled.div`
//   display: flex;
//   align-items: center;
// `

function getDefaultValueColumns(columns, sorterValue, tipData) {
  const [sorterKey = '', order = false] = `${sorterValue}`.split(',')
  // const tipData = useSelector((store) => store.init.tips)
  const updateColumn = (columnList) => {
    return columnList.map((col = {}) => {
      const { valueType, title = '', text = '', rows, key, dataIndex, link, width, tip } = col
      const colKey = dataIndex || key
      let renderTitle = title
      if (typeof title === 'string') {
        const titleSplitList = title.split('\n')
        renderTitle = (
          <div style={{ textAlign: 'center' }}>
            {titleSplitList.map((row) => (
              <div key={row}>{row}</div>
            ))}
          </div>
        )
      }
      const tipText = tipData?.[`${text || title}`.replace('\n', '')] || tip
      const showTooltip = !!tipText
      return {
        ...col,
        title: (
          <StyledTitleWrap style={width ?? { width }}>
            {showTooltip ? (
              <Tooltip title={tipText} withIcon>
                {renderTitle}
              </Tooltip>
            ) : (
              renderTitle
            )}
          </StyledTitleWrap>
        ),
        showSorterTooltip: false,
        render:
          col.render ||
          ((value, row) => {
            let renderValue = value
            // value为空时默认显示为 -
            if (!value && value !== 0) {
              renderValue = '-'
            }
            // 根据valueType的类型格式化value
            switch (valueType) {
              case 'number':
                renderValue = setThousands(renderValue)
                break
              case 'link':
                renderValue = <Link to={link(row)}>{value}</Link>
                break
              default:
                break
            }
            // 根据rows设置最多显示行数
            if (rows) {
              renderValue = <Tp rows={Number(rows)}>{renderValue}</Tp>
            }
            if (width) {
              renderValue = <div style={{ width }}>{renderValue}</div>
            }
            return renderValue
          }),
        ...(sorterValue !== undefined
          ? {
              sortOrder: sorterKey === colKey ? order : false,
            }
          : {}),
      }
    })
  }
  return columns.map((_column) => {
    let column = Immutable.Map(_column).toJS()
    const { children = [] } = column
    if (children.length) {
      column.children = updateColumn(children)
    } else {
      column = updateColumn([column])?.[0] || column
    }
    return column
  })
}

const getOffsetTop = (element) => {
  let actualTop = element.offsetTop
  let current = element.offsetParent

  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent
  }
  return actualTop
}

const getOffsetLeft = (element) => {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent

  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  return actualLeft
}

export default connect(
  (state) => ({
    tipData: state.init.tips,
  }),
  {},
  // forwardRef,
)(
  class StateSavedTable extends React.Component {
    static propTypes = {
      onSorterChange: PropTypes.func,
      columns: PropTypes.array,
      onChange: PropTypes.func,
      pagination: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
      fixed: PropTypes.bool,
    }

    static defaultProps = {
      onSorterChange: (f) => f,
      fixed: true,
    }

    constructor(props) {
      super(props)
      this.state = {
        columns: [],
        prevColumns: null,
        pageSize: 10,
      }
      const randomKey = `${Date.now()}-${Math.round(Math.random() * 1e10)}`
      this.tableClassName = `table-${randomKey}`
      this.fixedTableClassName = `table-${randomKey}-fixed-thead`
      this.tableOffset = {
        fixedTheadBeginOffsetTop: 0,
        fixedTheadEndOffsetTop: 0,
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      // console.log(nextProps, prevState)
      const { columns = [], sorter, tipData, tipKey = '' } = nextProps
      if (columns.length > 0) {
        return {
          columns: getDefaultValueColumns(columns, sorter, tipData?.[tipKey] || {}),
          prevColumns: columns,
        }
      }
      return null
    }

    componentDidMount() {
      const { fixed } = this.props
      if (fixed) {
        // 处理页面滚动时的表头固定
        setTimeout(() => {
          this.handlePageScroll()
        }, 1000)
      }
    }

    componentWillUnmount() {
      this.cleanPage()
    }

    cleanPage = () => {
      // 移除事件
      const pageContent = document.getElementById('content')
      pageContent.removeEventListener('scroll', this.pageScrollListener)
      // 删除dom
      const fixedTableDom = pageContent.querySelectorAll(`.${this.fixedTableClassName}`)
      if (fixedTableDom.length) {
        Array.from(fixedTableDom).forEach((dom) => {
          dom.remove()
        })
      }
    }

    updateOffsetInState = () => {
      const originThead = document.querySelector(`.${this.tableClassName} .ant-table-thead > tr:last-child`)
      const CONTENT_PADDING = 20
      if (originThead && originThead.offsetHeight) {
        const theadOffsetTop = getOffsetTop(originThead)
        // 拿到表格在y轴的起始坐标
        const fixedTheadBeginOffsetTop = theadOffsetTop - CONTENT_PADDING
        const fixedTheadEndOffsetTop =
          fixedTheadBeginOffsetTop +
          document.querySelector(`.${this.tableClassName} .ant-table-tbody`).offsetHeight -
          originThead.offsetHeight
        // this.setState({
        //   fixedTheadBeginOffsetTop,
        //   fixedTheadEndOffsetTop,
        // })
        this.tableOffset = {
          fixedTheadBeginOffsetTop,
          fixedTheadEndOffsetTop,
        }
      } else {
        // this.setState({
        //   fixedTheadBeginOffsetTop: 0,
        //   fixedTheadEndOffsetTop: 0,
        // })
        this.tableOffset = {
          fixedTheadBeginOffsetTop: 0,
          fixedTheadEndOffsetTop: 0,
        }
      }
    }

    handlePageScroll = () => {
      const pageContent = document.getElementById('content')
      const originThead = document.querySelector(`.${this.tableClassName} .ant-table-thead > tr:last-child`)
      if (pageContent && originThead) {
        setTimeout(() => {
          this.updateOffsetInState()
          // 监听页面滚动事件
          pageContent.addEventListener('scroll', throttle(this.pageScrollListener, 20))
          // pageContent.addEventListener('scroll', this.pageScrollListener)
          // 可能存在页面中表格移除问题，需要定时更新表格的位置信息
          setInterval(() => {
            this.updateOffsetInState()
          }, 200)
        }, 0)
      }
    }

    // debouncePageScrollListener = debounce(this.pageScrollListener, 1000)
    pageScrollListener = () => {
      // console.log(Date.now())
      // const { fixedTheadBeginOffsetTop, fixedTheadEndOffsetTop } = this.state
      const { fixedOffsetTop = 0 } = this.props
      const { fixedTheadBeginOffsetTop, fixedTheadEndOffsetTop } = this.tableOffset
      const contentScrollTop = document.getElementById('content').scrollTop
      // console.log(fixedTheadBeginOffsetTop, fixedTheadEndOffsetTop, contentScrollTop)
      // 决定是否需要固定thead
      if (
        contentScrollTop > fixedTheadBeginOffsetTop - fixedOffsetTop &&
        contentScrollTop < fixedTheadEndOffsetTop - fixedOffsetTop
      ) {
        // 固定
        this.addFixedThead()
      } else if (
        contentScrollTop <= fixedTheadBeginOffsetTop - fixedOffsetTop ||
        contentScrollTop >= fixedTheadEndOffsetTop - fixedOffsetTop
      ) {
        // 取消固定
        this.removeFixedThead()
      }
    }

    addFixedThead = () => {
      const fixedThead = document.querySelector(`#content .${this.fixedTableClassName}`)
      if (fixedThead) {
        return
      }
      // 始终拿到最新的thead状态(宽度、展开等)
      const originThead = document.querySelector(`.${this.tableClassName} .ant-table-thead > tr:last-child`)
      // 列宽
      const thWidthList = Array.from(originThead?.querySelectorAll?.('th') || []).map((th) => {
        return parseFloat(getComputedStyle(th).width)
      })
      if (!thWidthList.length) {
        return
      }
      // 表头高度
      const fixedTableTheadHeight = getComputedStyle(originThead).height
      // thead
      const fixedTheadNode = document.createElement('thead')
      fixedTheadNode.classList.add('ant-table-thead')
      const theadClone = originThead.cloneNode(true)
      Array.from(theadClone.querySelectorAll('th')).forEach((th, idx) => {
        th.style.width = `${thWidthList[idx]}px`
        th.style.minWidth = `${thWidthList[idx]}px`
        th.style.maxWidth = `${thWidthList[idx]}px`
        // th.style.paddingTop = 0
        // th.style.paddingBottom = 0
        th.style.height = fixedTableTheadHeight
      })
      fixedTheadNode.appendChild(theadClone)

      // table
      const fixedTableNode = document.createElement('table')
      const tableFullWidth = thWidthList.reduce((prev, curr) => prev + curr, 0)
      fixedTableNode.style.width = `${tableFullWidth}px`
      fixedTableNode.appendChild(fixedTheadNode)

      // table wrap
      const fixedTableWrap = document.createElement('div')
      fixedTableWrap.classList.add(this.fixedTableClassName, 'fixedTableThead', 'ant-table')
      const tableWrapWidth = parseFloat(getComputedStyle(document.querySelector(`.${this.tableClassName}`)).width)
      fixedTableWrap.style.width = `${tableWrapWidth}px`
      fixedTableWrap.appendChild(fixedTableNode)

      // 插入到dom中
      const pageContent = document.getElementById('content')
      pageContent.insertBefore(fixedTableWrap, pageContent.firstChild)

      // 同步横向滚动位置
      const tableScrollLeft = document.querySelector(`.${this.tableClassName} .ant-table-content`)?.scrollLeft || 0
      fixedTableWrap.scrollLeft = tableScrollLeft
      this.setScrollClassName(tableScrollLeft, tableWrapWidth, tableFullWidth)

      // 设置边距
      const pageContentOffsetLeft = getOffsetLeft(pageContent)
      const tableOffsetLeft = getOffsetLeft(document.querySelector(`.${this.tableClassName}`))
      const PAGE_CONTENT_PADDING = 20
      const tableOffsetPageContent = tableOffsetLeft - pageContentOffsetLeft - PAGE_CONTENT_PADDING
      fixedTableWrap.style.marginLeft = `${tableOffsetPageContent}px`

      // 设置高度，加1的border
      // fixedTableWrap.style.height = `${parseFloat(getComputedStyle(originThead).height) + 1}px`

      // 监听表格横向滚动事件
      document
        .querySelector(`.${this.tableClassName} .ant-table-content`)
        .addEventListener('scroll', this.handleTableScrollX)
      // 监听固定表头横向滚动事件
      document.querySelector(`.${this.fixedTableClassName}`).addEventListener('scroll', this.handleFixedTheadScrollX)

      // 点击固定表头回到表格顶部
      document.querySelector(`.${this.fixedTableClassName} thead`).addEventListener('click', this.handleJumpToTableTop)
    }

    handleJumpToTableTop = () => {
      const { fixedOffsetTop } = this.props
      if (fixedOffsetTop) {
        document.getElementById('content').scrollTo({
          top: this.tableOffset.fixedTheadBeginOffsetTop - fixedOffsetTop,
        })
      } else {
        document.querySelector(`.${this.tableClassName}`).scrollIntoView({
          // behavior: 'smooth',
          block: 'start',
        })
      }
    }

    handleTableScrollX = (e) => {
      const scrollDom = e.target
      const scrollLeft = scrollDom.scrollLeft
      // 同步固定表头
      const syncScrollDom = document.querySelector(`.${this.fixedTableClassName}`)
      if (syncScrollDom) {
        syncScrollDom.scrollLeft = scrollLeft
        this.setScrollClassName(scrollLeft)
      }
    }

    handleFixedTheadScrollX = (e) => {
      const scrollDom = e.target
      const scrollLeft = scrollDom.scrollLeft
      // 同步表格
      const syncScrollDom = document.querySelector(`.${this.tableClassName} .ant-table-content`)
      if (syncScrollDom) {
        syncScrollDom.scrollLeft = scrollLeft
        this.setScrollClassName(scrollLeft)
      }
    }

    setScrollClassName = (scrollLeft, wrapWidth, fullWidth) => {
      const fixedTableWrap = document.querySelector(`.${this.fixedTableClassName}`)
      if (fixedTableWrap) {
        if (scrollLeft > 0) {
          fixedTableWrap.classList.add('scroll-left')
        } else {
          fixedTableWrap.classList.remove('scroll-left')
        }
        // 检查右边是否滚动到底
        const tableWrapWidth =
          wrapWidth ?? parseFloat(getComputedStyle(document.querySelector(`.${this.tableClassName}`)).width)
        const tableFullWidth =
          fullWidth ?? parseFloat(getComputedStyle(document.querySelector(`.${this.tableClassName} thead`)).width)
        if (scrollLeft + tableWrapWidth >= tableFullWidth) {
          // 已滚到最右
          fixedTableWrap.classList.remove('scroll-ping-right')
        } else {
          fixedTableWrap.classList.add('scroll-ping-right')
        }
      }
    }

    removeFixedThead = () => {
      const fixedThead = document.querySelector(`#content .${this.fixedTableClassName}`)
      if (fixedThead) {
        fixedThead.remove()
        // 移除表格横向滚动监听
        document
          .querySelector(`.${this.tableClassName} .ant-table-content`)
          .removeEventListener('scroll', this.handleTableScrollX)
      }
    }

    handleTableChange = (pagination, ...rest) => {
      // console.log('in')
      const { onChange } = this.props
      const pageSize = pagination?.pageSize || this.state.pageSize
      this.setState({
        pageSize,
      })

      onChange && onChange(pagination, ...rest)

      // 滚动到页面顶部
      // 避免modal里的表格分页切换时也滚动
      // 还有一些多个表格存在的页面
      // const content = document.getElementById('content')
      // const modalVisible = !!document.getElementsByClassName('ant-modal').length
      // if (content && !modalVisible) {
      //   content.scrollTo(0, 0)
      // }
    }

    render() {
      const { pagination, className, fixedOffsetTop = 0, scroll, ...props } = this.props
      const { columns: newColumns, pageSize } = this.state
      return (
        <>
          <StyledFixedTable offsetTop={fixedOffsetTop} />
          <StyledTable
            bordered
            size="middle"
            {...props}
            pagination={
              pagination
                ? {
                    size: 'default',
                    pageSizeOptions: ['10', '30', '50'],
                    showTotal: pagination.showTotal || ((total) => `共${total}条`),
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSize,
                    ...pagination,
                  }
                : pagination ?? {
                    pageSize: 10,
                  }
            }
            onChange={this.handleTableChange}
            columns={newColumns}
            className={cx({
              [className]: !!className,
              [this.tableClassName]: true,
            })}
            scroll={scroll || {}}
          />
        </>
      )
    }
  },
)
