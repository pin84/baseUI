<template>
	<svg class='icon' >
		<use :xlink:href='`#i-${name}`'></use>
	</svg>
</template>

<script>
	export default {
		props:['name']
	}
</script>

<style lang='stylus' scoped>
	.icon{
		width: 1.6rem
		height: 1.6rem
	}
</style>