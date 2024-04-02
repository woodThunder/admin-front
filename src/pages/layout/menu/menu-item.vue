<template>
	<el-sub-menu v-if="data.type === 1" :index="data.id">
		<template #title>
			<el-icon v-if="data.icon">
				<component :is="data.icon"></component>
			</el-icon>
			<span>{{ data.title }}</span>
		</template>
		<MenuItem v-for="item in data.children" :key="item.id" :data="item" />
	</el-sub-menu>
	<el-menu-item 
		v-if="data.type === 2 && data.is_left_menu" 
	 :index="data.route_path"
	>
		<el-icon v-if="data.icon">
			<component :is="data.icon"></component>
		</el-icon>
		<span>{{ data.title }}</span>
	</el-menu-item>
</template>
  
<script lang="ts" setup>
defineProps({
	data: {
		type: Object,
		required: true
	}
})
</script>
  