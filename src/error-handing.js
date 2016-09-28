/**
 * 规定请求错误返回的errorMsg格式。
 */
export const setErrorMeg=(error)=>{
	return {
		success:error.data.success||false,
		error_msg:error.data.error_msg||"请求地址错误"
	}
}