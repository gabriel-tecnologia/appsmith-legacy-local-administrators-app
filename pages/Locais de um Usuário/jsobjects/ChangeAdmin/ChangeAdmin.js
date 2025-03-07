export default {
	isAdmin: ()=> TableLocationsFromUser.triggeredRow.Cargos.includes('ADMIN'),
	changeAdmin: async () => {
		let query = this.isAdmin() ? RemoveAdminProdOAuth : MakeAdminProdOAuth
		try{
			await query.run()	
			await SelectLocationsFromUserProd.run()
    }catch(error){
			let message;
			if (error.message === "Cannot read properties of undefined (reading 'run')") {
				message = "Você não tem permissão para realizar esta ação."
			}else{
				let erroData = JSON.parse(query.data)
				message = erroData.title;
			}
			showAlert(message,"error")
    }finally{
			closeModal("Modal_de_confirmacao")
		}
	}
}