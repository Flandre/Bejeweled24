function test(){
	console.log("fulan is baka");
}




var goal  = 24;
var equal=0.000001;

function is24(arr){
	for(var j=0;j<arr.length;j++){
		var tmp = new Array();
		for(var k=0;k<arr.length;k++){
			tmp[k]=arr[k];
		}
		tmp.splice(j,1);
		if(can(tmp,arr[j],goal)){
			
			return true;
		}
	}

	return false;
}

function eq(x,y){
	if(Math.abs(x-y)<equal){
		console.log('true')
		return true;
	}else{
		return false;
	}
}

function can(arr,last,ret){
	if(arr.length==0){
		return eq(last,ret);
	}else{
		var goallist = [ret+last,ret-last,ret*last,ret/last,last-ret,last/ret].unique();
		for(var i=0;i<goallist.length;i++){
			for(var j=0;j<arr.length;j++){
				var tmp = new Array();
				for(var k=0;k<arr.length;k++){
					tmp[k]=arr[k];
				}
				tmp.splice(j,1);
				if(can(tmp,arr[j],goallist[i])){
					//console.log(i,arr,last,ret,goallist[i]);
					
					if(i==0){
						console.log((ret+last)  + "-" + last + "=" + ret);
					}else if(i==1){
						console.log((ret-last)  + "+" + last + "=" + ret);
					}else if(i==2){
						console.log((ret*last)  + "/" + last + "=" + ret);
					}else if(i==3){
						console.log((ret/last)  + "*" + last + "=" + ret);
					}else if(i==4){
						console.log(last  + "-" + (last-ret) + "=" + ret);
					}else if(i==5){
						console.log(last  + "/" + (last/ret) + "=" + ret);
					}
					return true;
				}
			}
		}
		return false;
	}
}


function retlist(a,b){
	return [a+b,a-b,b-a,a*b,a/b,b/a].unique();
}


Array.prototype.unique = function()
{
	var n = {},r=[]; //n为hash表，r为临时数组
	for(var i = 0; i < this.length; i++) //遍历当前数组
	{
		if (!n[this[i]]) //如果hash表中没有当前项
		{
			n[this[i]] = true; //存入hash表
			r.push(this[i]); //把当前数组的当前项push到临时数组里面
		}
	}
	return r;
}

