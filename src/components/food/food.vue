<template>
	<transition  name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<div class="content">
					<h1 class="title">{{food.name}}</h1>
					<div class="detail">
						<span class="sell-count">月售{{food.sellCount}}份</span>
					    <span class="rating">好评率{{food.rating}}%</span>
					</div>
					<div class="price">
						<span class="new">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
					</div>
					<div class="cartcontrol-wrapper">
				   	    <cartcontrol :food="food" @add-to-cart="addToCart"></cartcontrol>
				    </div>
					<div class="buy" 
					   	v-show="!food.count || food.count=== 0"
					   	@click.stop.prevent="addFirst($event)">
					   	加入购物车
					</div>
			  </div>
			    <split v-show="food.info"></split>
			    <div class="info" v-show="food.info">
			    	<h1 class="title">商品介绍</h1>
			    	<p class="text">{{food.info}}</p>
			    </div>
			    <split></split>
			    <div class="rating">
			    	<h1 class="title">商品评价</h1>
			    	<ratingselect
			    		:select-type="selectType"
			    		:only-content="onlyContent"
			    		:desc="desc"
			    		:ratings="food.ratings">
			        </ratingselect>
			    </div>
			</div>
	    </div>
	</transition>
</template>

<script>
	import Vue from 'vue';
	import BScroll from 'better-scroll';
	import cartcontrol from'../cartcontrol/cartcontrol.vue';
	import split from'../split/split.vue';
	import ratingselect from '../ratingselect/ratingselect.vue';
	
	const POSITIVE = 0;
	const NEGATIVE = 1;
	const ALL = 2;
	
	export default{
		props:{
			food:{
				type:Object
			}
		},
		data(){
			return{
				showFlag:false,
				selectType:ALL,
				onlyContent:true,
				desc:{
					all:'全部',
					positive:'推荐',
					negative:'吐槽'
				}
			};
		},
		methods:{
			show(){
				// 初始化
				this.selectType = ALL;
				this.onlyContent = true;
				
				this.showFlag = true;
				this.$nextTick(() => {
					if(!this.scroll){
						this.scroll=new BScroll(this.$refs.food,{
							click:true
						});
					}else{
						this.scroll.refresh();
					}
					
				});
			},
			hide(){
				this.showFlag=false;
			},
			// 加入购物车
			addFirst(event){
				if(!event._constructed){
				    return;
			    }
				this.$emit('add-to-cart',event.target);
				Vue.set(this.food,'count',1);
			},
			addToCart(target){
				if(!event._constructed){
				    return;
			    }
				this.$emit('add-to-cart',target);
			}
		},
		components:{
			cartcontrol,
			split,
			ratingselect
		}
	};
</script>

<style lang="scss" scoped>
.food{
	position:fixed;
	left:0;
	top:0;
	bottom:48px;
	z-index:30;
	width:100%;
	background:#fff;
	transition:all 0.2s linear;
	transform:translate3d(0,0,0);
	&.move-enter,&.move-leave-to{
		transform:translate3d(100%,0,0);
    }
    .image-header{
    	position:relative;
    	width:100%;
    	height:0;
    	padding-top:100%;
    	img{
    		position:absolute;
    		top:0;
    		left:0;
    		width:100%;
    		height:100%;
    	}
    	.back{
    		position:absolute;
    		top:10px;
    		left:0;
    		.icon-arrow_lift{
    			display:block;
    			padding:10px;
    			font-size: 20px;
    			color:#fff;
    		}
    	}
    }
    .content{
    	padding:18px;
    	position:relative;
    	.title{
    		margin-bottom:8px;
    		line-height: 14px;
    		font-size:14px;
    		font-weight:700;
    		color:rgb(7,17,27);
    	}
    	.detail{
    		margin-bottom:18px;
    		height:10px;
    		line-height:10px;
    		font-size:0;
    		.sell-count,.rating{
    			font-size:10px;
    			color:rgb(147,153,159);
    		}
    		.sell-count{
    			margin-right:12px;
    		}
    	}
    	.price {
			.new {
				margin-right: 8px;
				font-size: 14px;
				color: rgb(240, 20, 20);
				font-weight: 700;
			}
			.old {
				text-decoration: line-through;
				font-size: 10px;
				color: rgb(147, 153, 159);
				font-weight: 700;
			}
		}
		.cartcontrol-wrapper{
    	position:absolute;
    	right:12px;
    	bottom:12px;
	    }
	    .buy{
	    	position:absolute;
	    	right:18px;
	    	bottom:18px;
	    	z-index:10px;
	    	height:24px;
	    	line-height: 24px;
	    	padding:0 12px;
	    	box-sizing:border-box;
	    	font-size:10px;
	    	color:#fff;
	    	background:rgb(0,160,220);
	    	border-radius:12px;
	    }
    }
    .info{
    	padding:18px;
    	.title{
    		line-height: 14px;
    		margin-bottom:6px;
    		font-size:14px;
    		color:rgb(7,17,27);
    	}
    	.text{
    		line-height: 24px;
    		font-size: 12px;
    		font-weight: 200;
    		color:rgb(77,85,93);
    	}
    }
    .rating{
    	padding-top:18px;
    	.title{
    		line-height: 14px;
    		font-size:14px;
    		color:rgb(7,17,27);
    		margin-left:18px;
    	}
    }
    
}

</style>