function GetData(chave) {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('MeuDB', 1);
  
      request.onsuccess = function(event) {
        const db = event.target.result;
        const transaction = db.transaction(['meuArmazenamento'], 'readonly');
        const store = transaction.objectStore('meuArmazenamento');
  
        const request = store.get(chave);
  
        request.onsuccess = function(event) {
          const resultado = event.target.result;
          if (resultado) {
            resolve(resultado);
          } else {
            reject('Chave não encontrada.');
          }
        };
  
        request.onerror = function() {
          reject('Erro ao recuperar a string.');
        };
  
        transaction.oncomplete = function() {
          db.close();
        };
      };
  
      request.onerror = function() {
        reject('Erro ao abrir o banco de dados.');
      };
    });
  }

  function SetData(musica, identificador){
   
    const request = indexedDB.open('MeuDB', 1);

    request.onsuccess = function(event) {
        const db = event.target.result;

  
        const transaction = db.transaction(['meuArmazenamento'], 'readwrite');
        const store = transaction.objectStore('meuArmazenamento');

        const getRequest = store.get(identificador);

        getRequest.onsuccess = function(event) {
            const objetoParaEditar = event.target.result;
        
            if (objetoParaEditar) {
                objetoParaEditar.conteudo = musica;
                store.put(objetoParaEditar);
        
            } else {
                const dados = { id: identificador, conteudo: musica };
                store.add(dados);   
            }
          };

        transaction.oncomplete = function() {
            db.close();
        };
    };

  }
function criaDB(){
    const request = indexedDB.open('MeuDB', 1);

    request.onupgradeneeded = function(event) {
        const db = event.target.result;
        db.createObjectStore('meuArmazenamento', { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = function(event) {
        const db = event.target.result;
    
        db.close();
    };
}

function removerObjeto(chaveParaRemover) {
    const request = indexedDB.open('MeuDB', 1);
  
    request.onsuccess = function(event) {
      const db = event.target.result;
  
      const transaction = db.transaction(['meuArmazenamento'], 'readwrite');
      const objectStore = transaction.objectStore('meuArmazenamento');
  
      objectStore.delete(chaveParaRemover);
  
      transaction.oncomplete = function() {
        db.close();
      };
    };
  }

export {GetData , SetData, criaDB, removerObjeto};
  