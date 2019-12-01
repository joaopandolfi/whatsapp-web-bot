(() => {
	//
	// GLOBAL VARS AND CONFIGS
	//
	var lastMessageOnChat = false;
	var ignoreLastMsg = {};
	var elementConfig = {
		"chats": [0, 0, 5, 2, 0, 3, 0, 0, 0],
		"chat_icons": [0, 0, 1, 1, 1, 0],
		"chat_title": [0, 0, 1, 0, 0, 0, 0],
		"chat_lastmsg": [0, 0, 1, 1, 0, 0],
		"chat_active": [0, 0],
		"selected_title": [0, 0, 5, 3, 0, 1, 1, 0, 0, 0],
		"select_clip": [0, 0, 5, 3, 0, 1, 2, 0, 1, 0],
		"select_image": [0, 0, 5, 3, 0, 1, 2, 0, 1, 1, 0, 0, 0, 0],
		"select_file": [0, 0, 5, 3, 0, 1, 2, 0, 1, 1, 0, 0, 0, 0]
	};

	//
	// FUNCTIONS
	//

	function BOT(title, currMsg){
		if (__memory[title].pedindo){

			if(!__memory[title].tradicional && !__memory[title].especial){
				if(currMsg.indexOf("especial")> -1){
					__memory[title].tipo =  "especial"
					__memory[title].tradicional = false
					__memory[title].especial = true
					__memory[title].atual = "pedido_g"
					__memory[title].fluxo.push(__memory[title].atual)

					sendText = __tree.pedido_g.msg.replace("{tipopedido}",__memory[title].tipo)
				}
				else if(currMsg.indexOf("tradicional")> -1){
					__memory[title].tipo =  "tradicional"
					__memory[title].tradicional = true
					__memory[title].especial = false
					__memory[title].atual = "pedido_g"
					__memory[title].fluxo.push(__memory[title].atual)
					
					sendText = __tree.pedido_g.msg.replace("{tipopedido}",__memory[title].tipo)
				}
			}else if(__memory[title].atual == "pedido_g"){
				if(currMsg.indexOf("1")> -1){
					__memory[title].atual = "pedido_g_1"
					__memory[title].fluxo.push(__memory[title].atual)
					sendText = __tree.pedido_g_1.msg.replace("{tipopedido}",__memory[title].tipo)
					sendText += __tree["sabor_"+__memory[title].tipo].msg
				}
				else if(currMsg.indexOf("2")> -1){
					__memory[title].atual = "pedido_g_2"
					__memory[title].fluxo.push(__memory[title].atual)
					sendText = __tree.pedido_g_2.msg.replace("{tipopedido}",__memory[title].tipo)
					sendText += __tree["sabor_"+__memory[title].tipo].msg
				}
			}else if(__memory[title].atual == "pedido_g_1"){
				value = parseInt(currMsg) -1
				sabor = __tree["sabor_"+__memory[title].tipo]
				if(value < sabor.size){
					__memory[title].atual = "confirma_pedido" 
					__memory[title].fluxo.push(__memory[title].atual)
					__memory[title].sabores.push(sabor.values[value])

					sendText = __tree.confirma_pedido.msg.replace("{pedido}",`Pedido ${__memory[title].tipo}, Sabor ${sabor.values[value]}`)
				}else{
					sendText = "Codigo invalido"
					// Codigo invalido
				}
			}else if(__memory[title].atual == "pedido_g_2"){
				// COLOCAR
				value = parseInt(currMsg) -1
				sabor = __tree["sabor_"+__memory[title].tipo]
				if(value < sabor.size){
					__memory[title].atual = "pedido_g_2_2" 
					__memory[title].fluxo.push(__memory[title].atual)
					__memory[title].sabores.push(sabor.values[value])

					sendText = __tree.pedido_g_2_2.msg.replace("{tipopedido}",__memory[title].tipo).replace("{sabor1}",sabor.values[value])
				}else{
					// Codigo invalido
					sendText = "Código invalido"
				}
			}
			else if(__memory[title].atual == "pedido_g_2_2"){
				// COLOCAR
				value = parseInt(currMsg) -1
				sabor = __tree["sabor_"+__memory[title].tipo]
				if(value < sabor.size){
					__memory[title].atual = "confirma_pedido" 
					__memory[title].fluxo.push(__memory[title].atual)
					__memory[title].sabores.push(sabor.values[value])

					sendText = __tree.confirma_pedido.msg.replace("{pedido}",`Pedido ${__memory[title].tipo}, Sabores: ${__memory[title].sabores[0]} e ${__memory[title].sabores[1]}`)
				}else{
					// Codigo invalido
					sendText = "Código invalido"
				}
			}
			else if(__memory[title].atual == "confirma_pedido"){
				if(currMsg.indexOf("1")> -1){
					__memory[title].atual = "pedido_confirmado" 
					__memory[title].fluxo.push(__memory[title].atual)
					__memory[title].pedindo = false

					__pedidos.push(Object.assign({},__memory[title]))
					__memory[title] = undefined
					sendText = __tree.pedido_confirmado.msg
				}else if(currMsg.indexOf("2")> -1){
					//Cancelar pedido
					__memory[title].atual = "pedido_cancelado" 
					__memory[title].fluxo.push(__memory[title].atual)
					__memory[title].pedindo = false

					__cancelados.push(Object.assign({},__memory[title]))
					__memory[title] = undefined
					sendText = __tree.pedido_cancelado.msg
				}
			}
		}else{
			if(currMsg.indexOf("pedido")> -1){
				__memory[title].pedindo = true
				__memory[title].atual = "pedindo"
				__memory[title].fluxo.push("pedindo")

				sendText = __tree.pedido.msg
			}
			else if(currMsg.indexOf("especiais")> -1){
				sendText = __tree.sabor_especial.msg
			}
			else if(currMsg.indexOf("tradicionais")> -1){
				sendText = __tree.sabor_tradicional.msg
			}else {
				sendText = __tree.default.msg
			}
		}

		console.log(sendText)
		return sendText
	}

	function simulateMouseClick(targetNode) {
		function triggerMouseEvent(targetNode, eventType) {
			var clickEvent = document.createEvent('MouseEvents');
			clickEvent.initEvent(eventType, true, true);
			targetNode.dispatchEvent(clickEvent);
		}
		["mouseover", "mousedown", "mouseup", "click"].forEach(function(eventType) { 
			triggerMouseEvent(targetNode, eventType);
		});
	}

	// Get random value between a range
	function rand(high, low = 0) {
		return Math.floor(Math.random() * (high - low + 1) + low);
	}
	
	function search_message(query_text){
	    me = document.getElementsByClassName("vW7d1");
	    tam = me.length;
	    msgs = [];
	    for(i =0; i< tam;i++){
		if(me[i].textContent.search(query_text) >= 0){
		    //console.log(me[i].textContent);
		    msgs.push(me[i].textContent);
		}   
	    }
	    return msgs;
	}
	
	function getElement(id, parent){
		if (!elementConfig[id]){
			return false;
		}
		var elem = !parent ? document.body : parent;
		var elementArr = elementConfig[id];
		for (var x in elementArr){
			var pos = elementArr[x];
			if (isNaN(pos*1)){ //dont know why, but for some reason after the last position it loops once again and "pos" is loaded with a function WTF. I got tired finding why and did this
				continue;
			}
			if (!elem.childNodes[pos]){
				return false;
			}
			elem = elem.childNodes[pos];
		}
		return elem;
	}
	
	function getLastMsg(){
		var messages = document.querySelectorAll('div.FTBzM');
		var pos = messages.length-1;
		
		while (messages[pos] && (messages[pos].classList.contains('msg-system') || messages[pos].querySelector('.message-out'))){
			pos--;
			if (pos <= -1){
				return false;
			}
		}
		if (messages[pos] && messages[pos].querySelector('.selectable-text')){
			return messages[pos].querySelector('.selectable-text').innerText;
		} else {
			return false;
		}
	}

	function getTypeLastMsg(){
		var messages = document.querySelectorAll('div.FTBzM');
		var pos = messages.length-1;
		
		if (messages[pos] && (messages[pos].classList.contains('msg-system') || messages[pos].classList.contains('message-in'))){
			return messages[pos].querySelector('.selectable-text').innerText;
		} else {
			return false;
		}
	}
	
	function getUnreadChats(){
		var unreadchats = [];
		var chats = getElement("chats");
		if (chats){
			chats = chats.childNodes;
			for (var i in chats){
				if (!(chats[i] instanceof Element)){
					continue;
				}
				var icons = getElement("chat_icons", chats[i]).childNodes;
				if (!icons){
					continue;
				}
				for (var j in icons){
					if (icons[j] instanceof Element){
						if (!(icons[j].childNodes[0].getAttribute('data-icon') == 'muted' || icons[j].childNodes[0].getAttribute('data-icon') == 'pinned')){
							unreadchats.push(chats[i]);
							break;
						}
					}
				}
			}
		}
		return unreadchats;
	}
	
	function didYouSendLastMsg(){
		var messages = document.querySelectorAll('div.FTBzM');
		if (messages.length <= 0){
			return false;
		}
		var pos = messages.length-1;
		
		while (messages[pos] && messages[pos].classList.contains('msg-system')){
			pos--;
			if (pos <= -1){
				return -1;
			}
		}
		if (messages[pos].querySelector('.message-out')){
			return true;
		}
		return false;
	}

	// Call the main function again
	const goAgain = (fn, sec) => {
		// const chat = document.querySelector('div.chat:not(.unread)')
		// selectChat(chat)
		setTimeout(fn, sec * 1000)
	}

	// Dispath an event (of click, por instance)
	const eventFire = (el, etype) => {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent(etype, true, true, window,0, 0, 0, 0, 0, false, false, false, false, 0, null);
		el.dispatchEvent(evt);
	}

	// Select a chat to show the main box
	const selectChat = (chat, cb) => {
		const title = getElement("chat_title",chat).title;
		eventFire(chat.firstChild.firstChild, 'mousedown');
		if (!cb) return;
		const loopFewTimes = () => {
			setTimeout(() => {
				const titleMain = getElement("selected_title").title;
				if (titleMain !== undefined && titleMain != title){
					console.log('not yet');
					return loopFewTimes();
				}
				return cb();
			}, 300);
		}

		loopFewTimes();
	}

	// Send a message
	const sendMessage = (chat, message, cb) => {
		//avoid duplicate sending
		var title;

		if (chat){
			title = getElement("chat_title",chat).title;
		} else {
			title = getElement("selected_title").title;
		}
		ignoreLastMsg[title] = message;
		
		messageBox = document.querySelectorAll("[contenteditable='true']")[0];

		//add text into input field
		messageBox.innerHTML = message.replace(/  /gm,'');

		//Force refresh
		event = document.createEvent("UIEvents");
		event.initUIEvent("input", true, true, window, 1);
		messageBox.dispatchEvent(event);

		//Click at Send Button
		eventFire(document.querySelector('span[data-icon="send"]'), 'click');

		cb();
	}

	//
	// MAIN LOGIC
	//
	const start = (_chats, cnt = 0) => {
		// get next unread chat
		const chats = _chats || getUnreadChats();
		const chat = chats[cnt];
		
		var imSendLastMessage = didYouSendLastMsg();
		var processLastMsgOnChat = false;
		var lastMsg;
		
		if (!lastMessageOnChat){
			if (false === (lastMessageOnChat = getLastMsg())){
				console.log(lastMessageOnChat)
				lastMessageOnChat = true; //to prevent the first "if" to go true everytime
			} else {
				lastMsg = lastMessageOnChat;
			}
		} else if (lastMessageOnChat != getLastMsg() && getLastMsg() !== false && !imSendLastMessage){
			lastMessageOnChat = lastMsg = getLastMsg();
			processLastMsgOnChat = true;
		}
		
		if (!processLastMsgOnChat && (chats.length == 0 || !chat)) {
			console.log(new Date(), 'nothing to do now... (1)', chats.length, chat);
			return goAgain(start, 3);
		}

		// get infos
		var title;
		if (!processLastMsgOnChat){
			title = getElement("chat_title",chat).title + '';
			lastMsg = (getElement("chat_lastmsg", chat) || { innerText: '' }).innerText; //.last-msg returns null when some user is typing a message to me
		} else {
			title = getElement("selected_title").title;
		}
		// avoid sending duplicate messaegs
		if (ignoreLastMsg[title] && (ignoreLastMsg[title]) == lastMsg) {
			console.log(new Date(), 'nothing to do now... (2)', title, lastMsg);
			return goAgain(() => { start(chats, cnt + 1) }, 0.1);
		}

		if (!processLastMsgOnChat){
			return selectChat(chat, () => {
				goAgain(start, 0.1);
			})
		} 
	
			// what to answer back?
			let sendText

			let currMsg =getTypeLastMsg() //lastMsg.toLowerCase()
			console.log(__memory[title])
			console.log(imSendLastMessage)
			console.log(currMsg)
			if(__memory[title] == undefined){
				__memory[title] = Object.assign({},__memory["example"]);
			}

			if(currMsg){
				sendText = BOT(title,currMsg)
			}

			// that's sad, there's not to send back...
			if (!sendText) {
				ignoreLastMsg[title] = lastMsg;
				console.log(new Date(), 'new message ignored -> ', title, lastMsg);
				return goAgain(() => { start(chats, cnt + 1) }, 0.1);
			}


			console.log(new Date(), 'new message to process, uhull -> ', title, lastMsg);

			sendMessage(null, sendText.trim(), () => {
				goAgain(() => { start(chats, cnt + 1) }, 0.1);
			});
	
/*
		if (!processLastMsgOnChat){
			selectChat(chat, () => {
				sendMessage(chat, sendText.trim(), () => {
					goAgain(() => { start(chats, cnt + 1) }, 0.1);
				});
			})
		} else {
			sendMessage(null, sendText.trim(), () => {
				goAgain(() => { start(chats, cnt + 1) }, 0.1);
			});
		}
*/
	}
	start();
})()