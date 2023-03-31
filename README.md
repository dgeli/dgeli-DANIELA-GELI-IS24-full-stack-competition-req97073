Web Products Management
Products website.
Features:
-Create, edit, delete and get of products.

Installation:
- java JDK 17.0.6
- Spring Boot 3.0.2
- Maven 3.3.9
- Angular CLI: 15.1.6
- Node: 18.14.1
- Package Manager: npm 9.3.1


Run the application:
1) Start the Java project called ¨webAplicationManagement¨ found in the webAplicationManagement\back-end folder:
   1- mvn install
   2- mvn spring-boot:run

2) Run in a terminal in the root path of the Angular project called ¨webAplicationManagement¨ found in the webAplicationManagement\front-end folder:
   1- npm install command to generate the ¨node_modules¨ folder.
   2- Start the Angular project with the ¨npm start¨ command.
   
   
API Rest:
- GET: getProducts()
  Description: Get all Product
  Endpoint: localhost:8080/api/products
  Receives: -
  Return: List<Product> - a list of products.
  HttpResponse:
	200 - OK return List<Product>
	404 - Request error - No products found
	500 - INTERNAL_SERVER_ERROR
	
	
- POST:addProduct()
  Description: Get all Product
  Endpoint: localhost:8080/api/products
  Receives: -
  Return: List<Product> - a list of products.
  HttpResponse:
	200 - OK
	404 - BAD_REQUEST - Request error
	500 - INTERNAL_SERVER_ERROR
	
	
- PUT: updateProduct()
  Description: Get all Product
  Endpoint: localhost:8080/api/products
  Receives: -
  Return: List<Product> - a list of products.
  HttpResponse:
	200 - OK
	404 - BAD - request error 
	500 - INTERNAL_SERVER_ERROR
	
	
- PUT: deleteProduct()
  Description: Get all Product
  Endpoint: localhost:8080/api/products
  Receives: -
  Return: List<Product> - a list of products.
  HttpResponse:
	200 - OK 
	404 - BAD - request error 
	500 - INTERNAL_SERVER_ERROR
  
  