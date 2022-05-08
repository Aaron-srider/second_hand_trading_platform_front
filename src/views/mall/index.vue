<template>
    <el-container style="width: 98%; margin: auto">
        <el-header>
            <el-row type="flex">
                <el-col :span="4">
                    <div style="text-align: center">
                        <h3>二手交易平台</h3>
                    </div>
                </el-col>
                <el-col :span="18">
                    <SearchInput
                        @searchResultComing="searchResult"
                        :pageSize="pagination.pageSize"
                        :pageNo="pagination.pageNo"
                    />
                </el-col>
            </el-row>
        </el-header>

        <el-container>
            <!-- 商品品类 -->
            <el-aside width="130px">
                <div>
                    <el-card class="box-card">
                        <div
                            style="
                                margin-bottom: 10px;
                                font-size: 20px;
                                font-weight: bold;
                            "
                        >
                            商品分类
                        </div>
                        <div
                            v-for="o in catagory"
                            :key="o"
                            style="margin-top: 5px; margin-bottom: 5px"
                        >
                            <a class="link" @click="searchCatagoryGoods(o.id)">
                                {{ o.name }}</a
                            >
                        </div>
                    </el-card>
                </div>
            </el-aside>
            <!-- 商品格子 -->
            <el-main>
                <div
                    style="
                        margin-bottom: 20px;
                        width: 100%;
                        border: 1px solid #ebeef5;
                    "
                >
                    <el-row type="flex">
                        <el-col :span="10">
                            <el-radio-group v-model="sortType">
                                <el-radio-button
                                    label="好评度"
                                ></el-radio-button>
                                <el-radio-button label="销量"></el-radio-button>
                                <el-radio-button
                                    label="价格升序"
                                ></el-radio-button>
                                <el-radio-button
                                    label="价格降序"
                                ></el-radio-button> </el-radio-group
                        ></el-col>
                        <el-col
                            :span="14"
                            style="
                                display: flex;
                                align-items: center;
                                justify-content: end;
                            "
                            ><el-pagination
                                :pager-count="3"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="pagination.pageNo"
                                :page-size="pagination.pageSize"
                                layout="total, prev, pager, next, jumper"
                                :total="pagination.total"
                        /></el-col>
                    </el-row>
                </div>

                <div>
                    <el-row
                        style="margin-bottom: 20px"
                        v-for="(row, row_index) in goodsMatrix"
                        v-bind:key="row.id"
                    >
                        <el-col
                            @click="toDetailPage()"
                            :span="5"
                            v-for="(goods, index) in row"
                            :goods-id="goods.id"
                            :key="goods.id"
                            :offset="index > 0 ? 1 : 0"
                        >
                            <el-card :body-style="{ padding: '0px' }">
                                <!-- 商品图片 -->
                                <div>
                                    <img
                                        src="data:image/png;base64,"
                                        style="height: 240px; width: 100%"
                                    />
                                </div>

                                <!-- 商品简介 -->
                                <div style="padding: 14px">
                                    <!-- 价格 -->
                                    <div style="margin-bottom: 5px">
                                        <span
                                            style="
                                                font-size: 20px;
                                                color: #ec5529;
                                            "
                                        >
                                            ￥{{ goods.price }}
                                        </span>
                                    </div>
                                    <!-- title -->
                                    <div>
                                        <p
                                            style="
                                                margin: 0;
                                                font-size: 14px;
                                                overflow: hidden;
                                                text-overflow: ellipsis;
                                                white-space: nowrap;
                                            "
                                        >
                                            {{ goods.goodsName }}
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            style="
                                                font-size: 14px;
                                                color: #898988;
                                            "
                                        >
                                            {{ goods.storeName }}
                                        </span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import { getPagedGoodsList } from '@/api/mall.js';
import SearchInput from '@/views/mall/SearchInput';
import { TransitionGroupStub } from '@vue/test-utils';
export default {
    data() {
        return {
            catagory: [
                {
                    id: 1,
                    name: '男装',
                },
                {
                    id: 2,
                    name: '手机',
                },
                {
                    id: 3,
                    name: '家具',
                },
                {
                    id: 4,
                    name: '箱包',
                },
                {
                    id: 5,
                    name: '数码',
                },
                {
                    id: 6,
                    name: '电器',
                },
            ],
            goodsMatrix: [
                [
                    {
                        id: 1,
                        name: '汉堡',
                        price: '1000.00',
                        goodsName: '汉堡',
                        storeName: 'A的小店',
                    },
                    {
                        id: 2,
                        name: '汉堡',
                        price: '1000.00',
                        goodsName: '汉堡',
                        storeName: 'A的小店',
                    },
                    {
                        id: 3,
                        name: '汉堡',
                        price: '1000.00',
                        goodsName: '汉堡',
                        storeName: 'A的小店',
                    },
                    {
                        id: 4,
                        name: '汉堡',
                        price: '1000.00',
                        goodsName: '汉堡',
                        storeName: 'A的小店',
                    },
                ],
                [
                    {
                        id: 5,
                        name: '汉堡',
                        price: '1000.00',
                        goodsName: '汉堡',
                        storeName: 'A的小店',
                    },
                ],
            ],
            goodsPage: [
                {
                    id: 1,
                    name: '汉堡',
                    price: '1000.00',
                    title: '汉堡',
                    store: 'A的小店',
                },
                {
                    id: 2,
                    name: '汉堡',
                    price: '1000.00',
                    title: '汉堡',
                    store: 'A的小店',
                },
                {
                    id: 3,
                    name: '汉堡',
                    price: '1000.00',
                    title: '汉堡',
                    store: 'A的小店',
                },
                {
                    id: 4,
                    name: '汉堡',
                    price: '1000.00',
                    title: '汉堡',
                    store: 'A的小店',
                },
                {
                    id: 5,
                    name: '汉堡',
                    price: '1000.00',
                    title: '汉堡',
                    store: 'A的小店',
                },
            ],
            goodsList: [],

            sortType: '好评度',

            pagination: {
                /**
                 * 总数
                 */
                total: 0,
                /**
                 * 当前页数
                 */
                pageNo: 1,
                /**
                 * 当前页面大小
                 */
                pageSize: 12,
                /**
                 * 页面可选的大小数组
                 */
                // pageSizeArray: [10, 20, 30, 40],
            },
        };
    },
    /**
     * 页面加载自动刷新（初始页面：1，初始页面大小：10）
     */
    created() {
        this.getPagedGoodsList(
            this.pagination.pageSize,
            this.pagination.pageNo
        );
    },
    components: {
        SearchInput,
    },
    methods: {
        renderPageWithGoodsPageData(jsonResult) {
            console.log(jsonResult.data);
            this.pagination.total = jsonResult.data.total;

            // store page goods list
            this.goodsList = jsonResult.data.pageData;

            // #region convert list to matrix (4 each row)
            function convertListToMatrix(list) {
                let matrix = [];
                let rowList = [];
                list.forEach((value, index, arr) => {
                    if (index % 4 === 0) {
                        rowList = [];
                        rowList.push(list[index]);
                        matrix.push(rowList);
                    } else {
                        rowList.push(list[index]);
                    }
                });
                return matrix;
            }
            // #endregion

            this.goodsMatrix = convertListToMatrix(this.goodsList);

            // #region put goods imgs to page
            this.renderGoodsImg();
            // #endregion
        },
        /**
         * render the goods img from this.goodsList
         */
        renderGoodsImg() {
            this.$nextTick(() => {
                // every goods-id was attached to the div of corresponding goods
                $('[goods-id]').each((index, domEle) => {
                    let $dom = $(domEle);
                    let goods_id = $dom.attr('goods-id');
                    let goods = this.goodsList.find(
                        (goods) => goods.id == goods_id
                    );
                    let base64Pic = goods.picList[0].base64Str;
                    let $img = $(`[goods-id=${goods_id}] img`);
                    $img.attr('src', `data:image/png;base64,${base64Pic}`);
                });
            });
        },
        /**
         * comp search-input emit
         */
        searchResult(pagination, goodsList, goodsMatrix) {
            // debugger;
            console.log(pagination, goodsList, goodsMatrix);
            this.pagination.total = pagination.total;
            // tihs.pagination.pageNo = pagination.pageNo;
            // this.pagination.pageSize = pagination.pageSize;

            this.goodsList = goodsList;
            this.goodsMatrix = goodsMatrix;

            this.renderGoodsImg();
        },

        /**
         * 展示对应门类的商品
         */
        searchCatagoryGoods(catagoryId) {},

        // #region 分页函数
        refreshCurrentPage() {
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },
        /**
         * 获取分页数据
         * @param {int} pageSize 页面大小
         * @param {int} pageNo 页面数
         */
        getPagedGoodsList(pageSize, pageNo) {
            getPagedGoodsList(pageSize, pageNo).then((jsonResult) => {
                this.renderPageWithGoodsPageData(jsonResult);
            });
        },

        /**
         * 更改页面大小时绑定到data:pageSize，并拉去更新后的页面
         * @param {int} pageSize 更新后的页面大小
         */
        handleSizeChange(pageSize) {
            this.pagination.pageSize = pageSize;
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },

        /**
         * 更改页面大小时绑定到data:pageNo，并拉去更新后的页面
         * @param {int} pageNo 更新后的页面数
         */
        handleCurrentChange(pageNo) {
            this.pagination.pageNo = pageNo;
            this.getPagedRegistApplication(
                this.pagination.pageSize,
                this.pagination.pageNo
            );
        },

        // #endregion
    },
};
</script>

<style lang="css" scoped>
.link:hover {
    text-decoration: underline;
    color: red;
}

.image {
    width: 100%;
    display: block;
}

/deep/ .el-radio-button:first-child .el-radio-button__inner {
    border-radius: 0;
}

/deep/ .el-radio-button:last-child .el-radio-button__inner {
    border-radius: 0;
}

/deep/ .el-radio-button__inner {
    border-top: 0;
    border-bottom: 0;
    border-left: 0;
}
</style>
