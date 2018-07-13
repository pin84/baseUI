<template>
	<button class='g-button' :class='{[`icon-${iconPosition}`]:true}'>
		<svg v-if='icon' class='icon' >
			<use :xlink:href='`#i-${icon}`'></use>
		</svg>
		<div class='content'>
			<slot></slot>
		</div>
	</button>
</template>

<script>
	export default {
		// props:['icon','iconPosition']
		props:{
			icon:{},
			iconPosition:{
				type:String,
				default:'left',
				validator (value){ //属性验证
					// if(value !== 'left' && value !== 'right'){
					// 	return false 
					// } else {
					// 	return true
					// }
					return value === 'left' || value === 'right'
				}
			}
		}
	}
</script>

<style lang='stylus' scoped>
	.g-button{
		font-size 1.4rem
		height:var(--button-height)
		padding:0 1rem
		border-radius:var(--border-radius)
		border:1px solid var(--border-color)
		background:var(--border-bg)
		display inline-flex
		justify-contents center
		align-items center
		vertical-align top
		
		&:hover{ 
			border-color:var(--border-color-hover)
		}
		&:active{
			background-color:var(--button-active-bg)
		}
		&:focus{
			outline:none
		}
		> .content{
			order:2
		}
		> .icon{
			order:1
			margin-right 1rem
		}
		&.icon-right{
			> .content{
				order:1
			}
			> .icon{
				order:2
				margin-right 0
				margin-left 1rem
			}
		}
	}
</style>