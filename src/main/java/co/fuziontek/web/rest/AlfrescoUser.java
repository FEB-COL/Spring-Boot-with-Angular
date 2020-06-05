//package co.fuziontek.web.rest;
//
//
//import co.fuziontek.service.dto.GearsViews;
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonInclude;
//import com.fasterxml.jackson.annotation.JsonView;
//
//import java.io.Serializable;
//import java.util.Map;
//
///**
// * Created by Andres on 16/06/2017.
// */
//@JsonInclude(JsonInclude.Include.NON_NULL)
//public class AlfrescoUser implements Serializable {
//
//    String id;
//
//    @JsonView(GearsViews.updateUser.class)
//    String firstName;
//
//    @JsonView(GearsViews.updateUser.class)
//    String lastName;
//    AlfrescoUser
//    @JsonView(GearsViews.updateUser.class)
//    Boolean enabled;
//
//    @JsonView(GearsViews.updateUser.class)
//    Boolean emailNotificationsEnabled;
//
//    @JsonView(GearsViews.updateUser.class)
//    String email;
//
//    String role;
//
//    String avatarId;
//
//    String telephone;
//
//    Map<String, String> company;
//
//    @JsonView(GearsViews.updateUser.class)
//    String password;
//
//    @JsonView(GearsViews.updateUser.class)
//    String oldPassword;
//
//    public AlfrescoUser() {}
//
//    public AlfrescoUser(String id, String firstName, String lastName, Boolean enabled, String email, AlfrescoSite site, String role, String avatarId) {
//        this.id = id;
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.enabled = enabled;
//        this.email = email;
//    }
//
//    public Boolean getEmailNotificationsEnabled() {
//        return emailNotificationsEnabled;
//    }
//
//    public void setEmailNotificationsEnabled(Boolean emailNotificationsEnabled) {
//        this.emailNotificationsEnabled = emailNotificationsEnabled;
//    }
//
//    public Map<String, String> getCompany() {
//        return company;
//    }
//
//    public void setCompany(Map<String, String> company) {
//        this.company = company;
//    }
//
//    public String getId() {
//        return id;
//    }
//
//    public void setId(String id) {
//        this.id = id;
//    }
//
//    public String getFirstName() {
//        return firstName;
//    }
//
//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public Boolean getEnabled() {
//        return enabled;
//    }
//
//    public void setEnabled(Boolean enabled) {
//        this.enabled = enabled;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public String getRole() {
//        return role;
//    }
//
//    public void setRole(String role) {
//        this.role = role;
//    }
//
//    public String getAvatarId() {
//        return avatarId;
//    }
//
//    public void setAvatarId(String avatarId) {
//        this.avatarId = avatarId;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }
//
//    public String getOldPassword() {
//        return oldPassword;
//    }
//
//    public void setOldPassword(String oldPassword) {
//        this.oldPassword = oldPassword;
//    }
//
//    public String getTelephone() {
//        return telephone;
//    }
//
//    public void setTelephone(String telephone) {
//        this.telephone = telephone;
//    }
//
//    @Override
//    public String toString() {
//        return "AlfrescoUser{" +
//            "id='" + id + '\'' +
//            ", firstName='" + firstName + '\'' +
//            ", lastName='" + lastName + '\'' +
//            ", email='" + email + '\'' +
//            ", enabled=" + enabled +
//            ", role=" + role +
//            ", phone=" + telephone +
//            "}";
//    }
//}
