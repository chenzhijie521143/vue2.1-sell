<template>
	<div class="cartcontrol">
		<transition name="move">
		    <div class="cart-decrease" 
				@click="decreaseCart"
				v-show="food.count>0">
				<span class="inner icon-remove_circle_outline"></span>
		    </div>
		</transition>
		<div class="cart-count"
			v-show="food.count>0">{{food.count}}
		</div>
		<div class="cart-add icon-add_circle"
			@click="addCart">
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
export default{
	props:{
		food:{
			type:Object
		}
	},
	methods:{
		//添加数量
		addCart(event){
			if(!event._constructed){
				return;
			}
			if(!this.food.count){
				// 设置对象的属性，主要用于避开 Vue 不能检测属性被添加的限制
				Vue.set(this.food,'count',1);
			}else{
				this.food.count ++;
			}
			//console.log(this.food.count);
		},
		//减少数量
		decreaseCart(event){
			if(!event._constructed){
				return;
			}
			if(this.food.count){
				this.food.count --;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
  .cartcontrol{
  	font-size: 0;
  	.cart-decrease{
        display:inline-block;
        padding:6px;
		transition: all 0.5s linear;
		&.move-enter,&.move-leave-to{
		    opacity:0;
		    transform:translate3D(24px,0,0);
		    .inner{
		    	transform:rotate(180deg);
		    }
		}
        .inner{
        	display:inline-block;
        	line-height:24px;
	  		font-size: 24px;
	        color:rgb(0,160,220);
	        transform:rotate(0);
		    transition: all 0.5s linear;
        }
  	}
  	.cart-count{
  		display:inline-block;
  		vertical-align:top;
  		text-align:center;
  		width:12px;
  		padding-top:6px;
  		line-height:24px;
  		font-size: 10px;
  		color:rgb(147,153,159);
  	}
  	.cart-add{
  		display:inline-block;
        line-height:24px;
  		font-size: 24px;
        padding:6px;
        color:rgb(0,160,220);
  	}
  }
</style>