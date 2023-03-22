Fabric set up

sudo apt update

sudo apt-get install git

sudo apt-get install curl

sudo apt install docker.io

sudo curl -L https://github.com/docker/compose/releases/download/1.28.5/docker-compose-`uname -s`-`uname -m` -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose  

sudo usermod -aG docker ${USER}

Close the ternimal and open again.

cd HyperLedger_Fabric_Supplychain/test-network

./network.sh up

1. Adding Orgs

./network.sh down

./network.sh up createChannel -ca -s couchdb

cd addOrg3

./addOrg3.sh up -c mychannel -ca -s couchdb

2. Generate org config

export FABRIC_CFG_PATH=$PWD

../../bin/configtxgen -printOrg Org3MSP > ../organizations/peerOrganizations/org3.example.com/org3.json


3. Starting docker container

docker-compose -f docker/docker-compose-org3.yaml up -d

cd ..



4. Deploy chain code

./network.sh deployCC -ccn SupplychainContract -ccp ../chaincode/ -ccl javascript -ccep "OR('Org1MSP.peer','Org2MSP.peer','Org3MSP.peer')"

5. Setting env variables

export PATH=${PWD}/../bin:$PATH

export FABRIC_CFG_PATH=$PWD/../config/

export CORE_PEER_TLS_ENABLED=true

export CORE_PEER_LOCALMSPID="Org1MSP"

export CORE_PEER_TLS_ROOTCERT_FILE=${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt

export CORE_PEER_MSPCONFIGPATH=${PWD}/organizations/peerOrganizations/org1.example.com/users/Admin@org1.example.com/msp

export CORE_PEER_ADDRESS=localhost:7051

6. Accessing CouchDB interface
http://localhost:5984/_utils/#
Username: admin
Password: adminpw


Initialize ChainCode
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract --peerAddresses localhost:7051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tls/ca.crt  --peerAddresses localhost:9051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tls/ca.crt  --peerAddresses localhost:11051 --tlsRootCertFiles ${PWD}/organizations/peerOrganizations/org3.example.com/peers/peer0.org3.example.com/tls/ca.crt  -c '{"function":"InitLedger","Args":[]}'





Interact with chain code
CreateProduct
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract -c '{"Args":["createProduct", "admin","Order002", "Orange", "160.00", "110", "farm1", "walmart"]}'

AssignShipper
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract -c '{"Args":["assignShipper","admin", "Order002", "Ship1"]}'

CreateShipment
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract -c '{"Args":["createShipment", "admin","Order002", "TrackingID1"]}'

TransportShipment
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract -c '{"Args":["transportShipment", "admin","Order002"]}'

ReceiveShipment
peer chaincode invoke -o localhost:7050 --ordererTLSHostnameOverride orderer.example.com --tls --cafile "${PWD}/organizations/ordererOrganizations/example.com/orderers/orderer.example.com/msp/tlscacerts/tlsca.example.com-cert.pem" -C mychannel -n SupplychainContract -c '{"Args":["receiveShipment", "admin","Order002"]}'

Select by ID
peer chaincode query -C mychannel -n SupplychainContract -c '{"Args":["selectOrderByID","Order002"]}' | jq

OrderHistory
peer chaincode query -C mychannel -n SupplychainContract -c '{"Args":["getOrderHistory","admin","Order002"]}' | jq




To Run Server Side
cd HyperLedger_Fabric_Supplychain/api
node enrollAdmin.js org1 admin adminpw
node enrollAdmin.js org2 admin adminpw
node enrollAdmin.js org3 admin adminpw
npm start


To Run Client Side
cd HyperLedger_Fabric_Supplychain/clientside/supplychain
npm start
