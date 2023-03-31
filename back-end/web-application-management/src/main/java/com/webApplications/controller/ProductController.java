package com.webApplications.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.type.TypeFactory;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.webApplications.entity.Product;

@RestController
@RequestMapping("/api/products")
public class ProductController {
   private static final Logger logger = LoggerFactory.getLogger(ProductController.class);
   private static final String FILE_NAME = "products.json";
   
       /**
        * Obtains a list of products.
        * @author Daniela Geli
        * @param 
        * @return <List<Product> - A list of products.
     */

     @GetMapping()
     @ResponseStatus(HttpStatus.OK)
     public ResponseEntity<List<Product>> getProducts() throws IOException {
        logger.info("Obtaining data from products...");
        Map<String, Object> response = new HashMap<String, Object>();
        List<Product> products = new ArrayList<Product>();
        try {
           ObjectMapper objectMapper = new ObjectMapper();
           InputStream inputStream = new FileInputStream(FILE_NAME);
           products = objectMapper.readValue(inputStream, TypeFactory.defaultInstance().constructCollectionType(List.class, Product.class));
           if (products.get(0).getProductId() != 0){
              logger.info("Products data were obtained");
              return ResponseEntity.ok(products);
           }else {
              logger.info("Products data were not found");
              return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
           }
     
        }catch (DataAccessException e) {
           logger.error("An error occurred while obtaining the products");  
           response.put("message: ", "An error occurred while obtaining the products");
           response.put("error: ", e.getMostSpecificCause().getMessage());
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
     }

        /**
        * Save a product.
        * @author Daniela Geli
        * @param Product The data of the product to save
        * @return
       */
      @PostMapping()
      @ResponseStatus(HttpStatus.OK)
      public ResponseEntity<Void> addProduct(@RequestBody Product product) throws IOException {
          logger.info("Saving product data...");
          try {

            if (product != null ){
               ObjectMapper objectMapper = new ObjectMapper();
               InputStream inputStream = new FileInputStream(FILE_NAME);
               List<Product> products = objectMapper.readValue(inputStream, TypeFactory.defaultInstance().constructCollectionType(List.class, Product.class));
       
               int maxProductId = products.stream()
                       .mapToInt(Product::getProductId)
                       .max()
                       .orElse(0);
       
               int newProductId = maxProductId + 1;
               product.setProductId(newProductId);
       
               products.add(product);
               objectMapper.writeValue(new File(FILE_NAME), products);
       
               logger.info("The product was saved");
               return ResponseEntity.ok().build();
            } else {
               logger.info("Products data were not found");
               return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

          } catch (DataAccessException e) {
              logger.error("An error occurred while saving the product");
              return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
          }
      }
      
      
      /**
        * Edit a product.
        * @author Daniela Geli
        * @param productId The ID of the product to edit
        * @param product The data of the product to edit
        * @return
       */
      @PutMapping("/{productId}")
      @ResponseStatus(HttpStatus.OK)
      public ResponseEntity<Void>  updateProduct(@PathVariable int productId, @RequestBody Product product) throws IOException {
         logger.info("Editing product data...");
         Map<String, Object> response = new HashMap<String, Object>();
         try {
            if (productId != 0 && product != null){
               ObjectMapper objectMapper = new ObjectMapper();
               InputStream inputStream = new FileInputStream(FILE_NAME);
                 List<Product> products = objectMapper.readValue(inputStream, new TypeReference<List<Product>>() {});
                 for (int i = 0; i < products.size(); i++) {
                    if (products.get(i).getProductId() == productId) {
                       products.get(i).setProductName(product.getProductName());
                       products.get(i).setProductOwnerName(product.getProductOwnerName());
                       products.get(i).setDevelopers(product.getDevelopers());
                       products.get(i).setScrumMasterName(product.getScrumMasterName());
                       products.get(i).setStartDate(product.getStartDate());
                       products.get(i).setMethodology(product.getMethodology());
                       break;
                    }
                 }
               objectMapper.writeValue(new File(FILE_NAME), products);
               logger.info("This product was edit");
               return ResponseEntity.ok().build();
            } else {
               return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }

         }catch (DataAccessException e) {
            response.put("message: ", "An error occurred while update the products");
            response.put("error: ", e.getMostSpecificCause().getMessage());
            logger.error("An error occurred while update the products");  
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
          }
      }


         /**
        * Delete a product.
        * @author Daniela Geli
        * @param productId The ID of the product to delete
        * @return
         */
      @DeleteMapping("/{productId}")
      @ResponseStatus(HttpStatus.OK)
      public ResponseEntity<Void>deleteProduct(@PathVariable int productId) throws IOException {
         logger.info("Deleting product data...");
         Map<String, Object> response = new HashMap<String, Object>();
         try {

            if (productId != 0){
               ObjectMapper objectMapper = new ObjectMapper();
               InputStream inputStream = new FileInputStream(FILE_NAME);
               List<Product> products = objectMapper.readValue(inputStream, TypeFactory.defaultInstance().constructCollectionType(List.class, Product.class));
               
               for (Iterator<Product> iterator = products.iterator(); iterator.hasNext();) {
                   Product product = iterator.next();
                   if (product.getProductId() == productId) {
                       iterator.remove();
                       break;
                   }
               }
               objectMapper.writeValue(new File(FILE_NAME), products);
               logger.info("This product was delete");
               return ResponseEntity.ok().build();
            } else {
               return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
            }


         }catch (DataAccessException e) {
            response.put("message: ", "An error occurred while delete the products");
            response.put("error: ", e.getMostSpecificCause().getMessage());  
            logger.error("An error occurred while delete the products"); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); 
          }
      }
 }