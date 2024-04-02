<template>
	<div class="head">
		<div class="logo">
			<img src="@/assets/images/logo.png" />
			<span>后台管理系统</span>
		</div>
		<div class="action">
			<el-popover placement="bottom" :width="120" trigger="hover">
				<template #reference>
					<div class="avatar-container">
						<span class="name">{{ userInfo.account }}</span>
						<el-avatar :icon="UserFilled" :size="40" />
					</div>
				</template>
				<div class="action-list">
					<div class="action-item" @click="logout">退出登录</div>
					<!-- <div class="action-item">修改密码</div> -->
				</div>
			</el-popover>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { logout } from '@/utils/common'

const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') as string))


</script>
<style lang="scss" scoped>
.head{
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	.logo {
		display: flex;
		align-items: center;
		img {
			height: 40px;
		}
		span {
			font-size: 16px;
			font-weight: 700;
		}
	}
	.action {
		display: flex;
		align-items: center;
		.avatar-container {
			display: flex;
			align-items: center;
			cursor: pointer;
			.name {
				margin-right: 4px;
			}
		}
	}
}
.action-list {
	.action-item {
		height: 34px;
		line-height: 34px;
		text-align: center;
		font-size: 12px;
		cursor: pointer;
		&:hover {
			background-color: #EB7019;
			color: #fff;
		}
	}
}
</style>