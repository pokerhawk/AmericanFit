# Builda o nosso projeto
docker build -t americanfit-frontend .

# Cria uma network
docker network create americanfit-network

# Cria uma instancia do nosso projeto

#					|nome do container      |nome do volume                            |network a ser usada|imagem
docker run -d --name americanfit-frontend -v americanfit-volume:/var/www/html --network americanfit-network americanfit-frontend

# Caso queira acessar o bash do container:
# Cria uma instancia para poder acessar o container
# docker run -d --name watch-americanfit -it americanfit-frontend
# Commando para entrar na instancia do container
# docker exec -it watch-americanfit /bin/bash
