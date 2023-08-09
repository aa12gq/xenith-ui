<template>
    <el-card class="box-card w-[20rem] !shadow-none">
        <template #header>
            <div class="card-header border-b">
                <img
                    src="https://bitpig-column.oss-cn-hangzhou.aliyuncs.com/AA12/190691488370262017.jpg"
                    class="w-8 mr-3"
                />
                <span>A12技术社区</span>
            </div>
        </template>
        <div class="text-sm text-[#5D6367]">
            Go（又称 Golang）是 Google
            开发的一种静态强类型、编译型、并发型，并具有垃圾回收功能的编程语言。Go
            被誉为是未来的服务器端编程语言。
        </div>
        <div class="flex items-center w-full justify-center mt-6">
            <el-button class="w-full px-2">
                <el-icon><EditPen /></el-icon>
                <span class="ml-2">发布内容</span>
            </el-button>
        </div>
    </el-card>
</template>
