<template>
    <el-container>
        <el-header
            ><el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
            >
                <el-menu-item index="1">所有订单</el-menu-item>
                <el-menu-item index="2">待收货</el-menu-item>
                <el-menu-item index="3">已完成</el-menu-item>
                <!-- <el-menu-item index="4"
                    ><a href="https://www.ele.me" target="_blank"
                        >订单管理</a
                    ></el-menu-item
                > -->
            </el-menu></el-header
        >

        <el-main>
            <OrderList />
        </el-main>
    </el-container>
</template>

<script>
import OrderList from './OrderList.vue';
export default {
    components: {
        OrderList,
    },
    data() {
        return {
            activeIndex: '1',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
    },
};
</script>

<style></style>
