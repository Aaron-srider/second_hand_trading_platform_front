<template>
    <div style="width: 100%; height: 100%; display: flex; align-items: center">
        <el-input placeholder="按商品名搜索" v-model="goodsName"> </el-input>
        <el-button type="primary" :round="false" @click="searchGoods">
            搜索
        </el-button>
    </div>
</template>

<script>
import { getPagedGoodsList } from '@/api/mall.js';
export default {
    name: 'SearchInput',
    props: {
        pageSize: Number,
        pageNo: Number,
    },
    data() {
        return {
            goodsName: '',
        };
    },
    methods: {
        searchGoods() {
            getPagedGoodsList(this.pageSize, this.pageNo, this.goodsName).then(
                (jsonResult) => {
                    console.log(jsonResult.data);
                    let pagination = {};
                    pagination.total = jsonResult.data.total;
                    pagination.pageSize = this.pageSize;
                    pagination.pageNo = this.pageNo;
                    let goodsList = jsonResult.data.pageData;

                    let goodsMatrix = [];
                    let rowList = [];
                    goodsList.forEach((value, index, arr) => {
                        console.log('index:', index);
                        if (index % 4 === 0) {
                            console.log(
                                'new row in matrix, row no:' +
                                    parseInt(index / 4)
                            );
                            rowList = [];
                            rowList.push(goodsList[index]);
                            goodsMatrix.push(rowList);

                            console.log(
                                'matrix:',
                                goodsMatrix,
                                'rowlist:',
                                rowList
                            );
                        } else {
                            console.log(
                                'new goods in row, row no:' +
                                    parseInt(index / 4)
                            );
                            rowList.push(goodsList[index]);
                        }
                    });

                    console.log('goodsMatrix:', goodsMatrix);

                    this.$emit(
                        'searchResultComing',
                        pagination,
                        goodsList,
                        goodsMatrix
                    );
                }
            );
        },
    },
};
</script>

<style></style>
