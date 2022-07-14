<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Dashboard',
    computed: {
        ...mapGetters(['name']),
    },
    created() {
        if (localStorage.getItem('hasFresh') == '0') {
            this.$router.go(0);
        }
        localStorage.setItem('hasFresh', '1');
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
