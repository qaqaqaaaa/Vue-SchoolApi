<template>
<Layout>
<!-- <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header> -->
<Content :style="{padding: '0 16px 16px'}">
    <Breadcrumb :style="{margin: '16px 0'}">
        <BreadcrumbItem>考试安排</BreadcrumbItem>
    </Breadcrumb>
    <Card>
        <div style="height: 600px">
        学年学期：<Select v-model="nj" style="width:200px">
        <Option v-for="item in njList" :value="item.value" :key="item.label">{{ item.label }}</Option>
            </Select> <Button type="primary" @click="handleClick">查询</Button>
            <br/><br/>
            <Table :columns="columns1" :data="cj"></Table>
        </div>
    </Card>
</Content>
</Layout>
</template>


<script>
export default {

}
</script>

<style>

</style>