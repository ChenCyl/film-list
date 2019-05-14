<template>
  <div id="rating">
    <!-- 总评分 -->
    <div>
      <div class="doubanRating">豆瓣评分</div>
      <span class="average">{{rating.average}}</span><span class="doubanRating">{{rating.rating_people}}人评价</span>
    </div>
    <!-- 树形图 -->
    <div class="svgContainer"></div>
    <div class="x-index">5星&emsp;4星&emsp;3星&emsp;2星&emsp;1星&emsp;</div>
  </div>
</template>

<script>
import { parse } from "path";
export default {
  name: "rating",
  props: ["rating"],
  computed: {
    //定义一个数组
    dataset() {
      return this.rating.stars.map(x => {
        return parseInt(x) / 100;
      });
    }
  },
  mounted() {
    //画布大小
    var width = 200;
    var height = 200;

    //在 body 里添加一个 SVG 画布
    var svg = d3
      .select(".svgContainer")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    //画布周边的空白
    var padding = { left: 30, right: 30, top: 20, bottom: 20 };

    //x轴的比例尺
    var xScale = d3.scale
      .ordinal()
      .domain(d3.range(this.dataset.length))
      .rangeRoundBands([0, width - padding.left - padding.right]);

    //y轴的比例尺
    var yScale = d3.scale
      .linear()
      .domain([0, 0.7])
      .range([height - padding.top - padding.bottom, 0]);

    //矩形之间的空白
    var rectPadding = 4;

    //添加矩形元素
    var rects = svg
      .selectAll(".MyRect")
      .data(this.dataset)
      .enter()
      .append("rect")
      .attr("class", "MyRect")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      .attr("x", function(d, i) {
        return xScale(i) + rectPadding / 2;
      })
      .attr("y", function(d) {
        return yScale(d);
      })
      .attr("width", xScale.rangeBand() - rectPadding)
      .attr("height", function(d) {
        return height - padding.top - padding.bottom - yScale(d);
      });

    //添加文字元素
    var texts = svg
      .selectAll(".MyText")
      .data(this.dataset)
      .enter()
      .append("text")
      .attr("class", "MyText")
      .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
      .attr("x", function(d, i) {
        return xScale(i) + rectPadding / 2;
      })
      .attr("y", function(d) {
        return yScale(d) - 25;
      })
      .attr("dx", function() {
        return (xScale.rangeBand() - rectPadding) / 2;
      })
      .attr("dy", function(d) {
        return 20;
      })
      .text(function(d) {
        return d;
      });
  }
};
</script>

<style>

#rating .MyRect {
  fill:white;
  stroke:black;
}

#rating .MyText {
  fill: black;
  text-anchor: middle;
  font-size: 10px;
}
#rating .x-index {
  font-size: 10px;
  margin-left: 30px;
}
#rating .average {
  font-size: 32px;
  font-weight: bold;
  margin-left: 30px;
  color:coral;
}

#rating .doubanRating {
  font-size: 14px;
  color: gray;
  margin-left: 30px;
}
</style>
