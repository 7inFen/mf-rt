// import './styles.css'
import React from 'react'
import { G2, Chart, Tooltip, Interval } from 'bizcharts'
import styled from 'styled-components'

const StyledApp = styled.div`
  padding: 20px;
  h2 {
    margin-bottom: 20px;
    text-align: center;
  }
`

const data = [
  { name: '菁挚', 月份: '菁挚', 月均降雨量: 2991 },
  { name: '菁挚', 月份: '菁挚蓝罐', 月均降雨量: 753 },
  { name: '菁挚', 月份: '脐带血营养群', 月均降雨量: 307 },
  { name: '菁挚', 月份: '叶黄素', 月均降雨量: 704 },
  { name: '菁挚', 月份: 'DHA', 月均降雨量: 2584 },
  { name: '菁挚', 月份: 'RRR', 月均降雨量: 1671 },
  { name: '菁挚', 月份: '眼脑发育', 月均降雨量: 23 },
  { name: '菁挚', 月份: '感知力', 月均降雨量: 147 },
  { name: '菁挚', 月份: '宝宝奶粉', 月均降雨量: 173 },

  { name: '菁挚蓝罐', 月份: '菁挚', 月均降雨量: 2316 },
  { name: '菁挚蓝罐', 月份: '菁挚蓝罐', 月均降雨量: 1292 },
  { name: '菁挚蓝罐', 月份: '脐带血营养群', 月均降雨量: 394 },
  { name: '菁挚蓝罐', 月份: '叶黄素', 月均降雨量: 1052 },
  { name: '菁挚蓝罐', 月份: 'DHA', 月均降雨量: 2552 },
  { name: '菁挚蓝罐', 月份: 'RRR', 月均降雨量: 2114 },
  { name: '菁挚蓝罐', 月份: '眼脑发育', 月均降雨量: 36 },
  { name: '菁挚蓝罐', 月份: '感知力', 月均降雨量: 224 },
  { name: '菁挚蓝罐', 月份: '宝宝奶粉', 月均降雨量: 149 },

  { name: '脐带血营养群', 月份: '菁挚', 月均降雨量: 3678 },
  { name: '脐带血营养群', 月份: '菁挚蓝罐', 月均降雨量: 2194 },
  { name: '脐带血营养群', 月份: '脐带血营养群', 月均降雨量: 1179 },
  { name: '脐带血营养群', 月份: '叶黄素', 月均降雨量: 1790 },
  { name: '脐带血营养群', 月份: 'DHA', 月均降雨量: 3642 },
  { name: '脐带血营养群', 月份: 'RRR', 月均降雨量: 2695 },
  { name: '脐带血营养群', 月份: '眼脑发育', 月均降雨量: 67 },
  { name: '脐带血营养群', 月份: '感知力', 月均降雨量: 217 },
  { name: '脐带血营养群', 月份: '宝宝奶粉', 月均降雨量: 244 },

  { name: '眼脑发育', 月份: '菁挚', 月均降雨量: 92 },
  { name: '眼脑发育', 月份: '菁挚蓝罐', 月均降雨量: 68 },
  { name: '眼脑发育', 月份: '脐带血营养群', 月均降雨量: 49 },
  { name: '眼脑发育', 月份: '叶黄素', 月均降雨量: 201 },
  { name: '眼脑发育', 月份: 'DHA', 月均降雨量: 1556 },
  { name: '眼脑发育', 月份: 'RRR', 月均降雨量: 66 },
  { name: '眼脑发育', 月份: '眼脑发育', 月均降雨量: 334 },
  { name: '眼脑发育', 月份: '感知力', 月均降雨量: 18 },
  { name: '眼脑发育', 月份: '宝宝奶粉', 月均降雨量: 26 },

  { name: '感知力', 月份: '菁挚', 月均降雨量: 42 },
  { name: '感知力', 月份: '菁挚蓝罐', 月均降雨量: 29 },
  { name: '感知力', 月份: '脐带血营养群', 月均降雨量: 5 },
  { name: '感知力', 月份: '叶黄素', 月均降雨量: 24 },
  { name: '感知力', 月份: 'DHA', 月均降雨量: 57 },
  { name: '感知力', 月份: 'RRR', 月均降雨量: 62 },
  { name: '感知力', 月份: '眼脑发育', 月均降雨量: 10 },
  { name: '感知力', 月份: '感知力', 月均降雨量: 1183 },
  { name: '感知力', 月份: '宝宝奶粉', 月均降雨量: 2 },
]

export default function App() {
  return (
    <StyledApp className="App">
      <h2>关键词搜索结果文章中含有关键字对比</h2>
      <Chart height={500} padding="auto" data={data} autoFit>
        <Interval
          adjust={[
            {
              type: 'dodge',
              marginRatio: 0,
            },
          ]}
          color="name"
          position="月份*月均降雨量"
        />
        <Tooltip shared />
      </Chart>
    </StyledApp>
  )
}
