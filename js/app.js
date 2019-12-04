$(function () {
	let stock = 2411;
	let wallet = {
		BTC: '1PjHq8tR6UWg2UuiWw3Dy5czExCwSsbpvH',
		ETH: '0x42AE84AdF83015Dc622E952EE273395745B6eBAd',
		BCH: 'qr8a86rxa8m0ndtsalvehrcux4rq4tsc05654fjtzh',
		XMR: '43TmPNV4MrQDQMye7WrbrziLKM8fLay98Spc6AiAcjGTiJWDNEDZpfg5P4d12ZZ2GXFDP3Amz349witdMuAomspuF3VUps7',

	};
	let price = 0.15;
	let name, amount, server, cc, inusd, incc;
	$('#amount').keypress((eventObject) => {
		if (event.keyCode < 48 || event.keyCode > 57)
    		event.returnValue= false;
	});

	$('#calc').click(() => {
		amount = $('#amount').val();
		cc = $('select[name=crypto]').val();
		if(amount > 0 && amount <= stock) {
			$.ajax({
				type: 'GET',
			  url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,BCH,XMR,DASH",
				  success: function(r){
				  	inusd = amount*price;
				  	incc = inusd * r[cc];
				  	$('#result').html("Get <strong>"+ amount + " coins </strong> for <strong>" + incc.toFixed(7) + " " + cc + "</strong> ($" + inusd + ")");
			  }
			});    
		}
		
	});



	$('#buy').click(() => {
		name = $('#name').val().trim();
		server = $('select[name=server]').val();
		cc = $('select[name=crypto]').val();
		amount = $('#amount').val();
		if(name && amount > 0 && amount <= stock) {
			$.ajax({
			type: 'GET',
			url: "https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,BCH,XMR,DASH",
			success: function(r){
			inusd = amount*price;
			incc = inusd * r[cc];
			$('#result').html("Get <strong>"+ amount + " coins </strong> for <strong>" + incc.toFixed(7) + " " + cc + "</strong> ($" + inusd + ")");
			$('#result2').html("For payment, send the amount of <strong>" + incc.toFixed(7) + " " + cc + "</strong> to the address <strong>" + wallet[cc] +"</strong>");
			}
			});    
			
		}
		else{
			alert('Incorrect character name / amount');
		}
		
	});
  
});
