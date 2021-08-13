const crypto=require('crypto')
const fs=require('fs')

function generateKeyPair()
{
    // Generates an object where the keys are stored in properties private key and
    // public key

    const keyPair=crypto.generateKeyPairSync('rsa',{
        modulusLength:4096,//standard bits for rsa keys
        publicKeyEncoding:{
            type:'pkcs1',//public key cryptography standard 1
            format:'pem' //formatting choice
        },
        privateKeyEncoding:{
            type:'pkcs1',
            format:'pem'
        }
    })

    // The public key file
    fs.writeFileSync(__dirname + '/id_rsa_pub.pem',keyPair.publicKey)

    // the private key file
    fs.writeFileSync(__dirname + '/id_rsa_priv.pem',keyPair.privateKey)
}


generateKeyPair()