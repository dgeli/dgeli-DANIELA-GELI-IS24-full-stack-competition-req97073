package com.webApplications.entity;

import java.util.List;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Product {
    private int productId;
    private String productName;
    private String productOwnerName;

    @JsonProperty("Developers")
    private List<String> developers;

    private String scrumMasterName;
    private String startDate;
    private String methodology;

    public Product() {
    }

    public Product(int productId, String productName, String productOwnerName, List<String> developers, String scrumMasterName, String startDate, String methodology) {
        this.productId = productId;
        this.productName = productName;
        this.productOwnerName = productOwnerName;
        this.developers = developers;
        this.scrumMasterName = scrumMasterName;
        this.startDate = startDate;
        this.methodology = methodology;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getProductOwnerName() {
        return productOwnerName;
    }

    public void setProductOwnerName(String productOwnerName) {
        this.productOwnerName = productOwnerName;
    }

    public List<String> getDevelopers() {
        return developers;
    }

    public void setDevelopers(List<String> developers) {
        this.developers = developers;
    }

    public String getScrumMasterName() {
        return scrumMasterName;
    }

    public void setScrumMasterName(String scrumMasterName) {
        this.scrumMasterName = scrumMasterName;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getMethodology() {
        return methodology;
    }

    public void setMethodology(String methodology) {
        this.methodology = methodology;
    }
}
