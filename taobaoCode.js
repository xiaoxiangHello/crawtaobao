var query = "抖音";
var brand = ""
var categroy = "网红";
$.ajax({
			url:"https://pub.alimama.com/items/search.json",
			data:{
				q:query,
				_t:"1548212021792",
				toPage:1,
				dpyhq:1,
				perPageSize:50,
				b2c:1,
				// startTkRate:10,
				// endTkRate:50,
				_tb_token:"e5e97e563b33d",
				freeShipment:1,

			},
			type:"GET",
			success:function(data){
				var pagelist = data.data.pageList;
				console.log(pagelist);
				
				$.each(pagelist, function(pageIndex, pageValue){
					var title = pageValue.title;
					var picUrl = "https:" + pageValue.pictUrl;
					var price = pageValue.zkPrice;
					var url = pageValue.auctionUrl;
					var auctionId = pageValue.auctionId;
					var nick = pageValue.nick;
					var couponAmount = pageValue.couponAmount;
					var couponEffectiveStartTime = pageValue.couponEffectiveStartTime;
					var couponEffectiveEndTime = pageValue.couponEffectiveEndTime;
					
					$.ajax({ 
						url:"https://pub.alimama.com/common/code/getAuctionCode.json",
						data:{
					    	auctionid:auctionId,
					    	adzoneid:"65419350278",
					    	siteid:"237200324",
					    	scenes:1,
					    	tkFinalCampaign:10,
					    	t:"1543894496755",
					    	_tb_token_:"ff156e7d5ee83"
					  		},
					  		type:"GET",
					  		dataType: "json",
					  		success: function(res){
					  			console.log(res);
					  			 var info_data = res.data;
					       	 	 var shortLink = info_data.shortLinkUrl;
					       	 	 var couponShortLink = info_data.couponShortLinkUrl;
					       	 	 var couponToken = info_data.couponLinkTaoToken;
					       	 	 var taoToken = info_data.taoToken;

					  			 $.ajax({
					       	 	url:"https://api.lanyintao.com/home/taoBao/index",
					        	data:{
					        		title:title,
					        		picUrl:picUrl,
					        		price:price,
					        		url:url,
					        		nick:nick,
					        		shortLink:shortLink,
					        		taoToken:taoToken,
					        		couponShortLink:couponShortLink,
					        		couponToken:couponToken,
					        		query:query,
					        		couponAmount:couponAmount,
					        		couponEffectiveStartTime:couponEffectiveStartTime,
					        		couponEffectiveEndTime:couponEffectiveEndTime,
					        		categroy:categroy,
					        		zt:0
					        	},
					        	type:"GET",
					        	dataType:"jsonp",
			    				jsonp: "callback",
			    				//jsonpCallback:"ooo",
					        	success: function(result){
					        		console.log(result)
					        		
					        	}
				           	 })
				        	 
				      		}
					})

				})
				
			}
})