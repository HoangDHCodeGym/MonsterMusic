cd client;
npm run build;
cd ..;
./gradlew build;
cd server;
cd build;
cd libs;
java -jar server-0.0.1-SNAPSHOT.jar;
