package co.fuziontek.service.dto;

import co.fuziontek.domain.User;

import java.time.LocalDate;
import java.io.Serializable;
import java.util.Objects;
import java.util.Set;

/**
 * A DTO for the GearUser entity.
 */
public class GearUserDTO implements Serializable {

    private Long id;

    private String name;

    private String password;

    private String email;

    private String avatar;



    private String profile;

    private Boolean state;

    private String idAlfresco;

    private Integer loginAttempts;

    private LocalDate lastUpdatePasswordDate;

    private String passwordResetKey;

    private Integer pin;

    private Long gearOrganizationalUnitId;

    private String gearOrganizationalUnitName;

    // se Modifica este DTO para relacionar la parte de usuario con user-gear para que obtenga los mismos privilegio de user de jhipster para mas informacion
    //se baso en la siguiente documentacion
    //https://www.jhipster.tech/tips/022_tip_registering_user_with_additional_information.html
    // tambien se modifico el Gearuser.java que se encuentraen domain OJo con estos para metros... buena Suerte colega (por--> FEB).
    //    private User user; al final no se utilizo este campo se dio cuenta que utilizamos el mismo id de user eso es todo

    public Boolean getState() {
        return state;
    }

//    public User getUser() {
//        return user;
//    }

//    public void setUser(User user) {
//        this.user = user;
//    }
    /////////////////////////////////////////////////////////////////////////////////////////

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getProfile() {
        return profile;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Boolean isState() {
        return state;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getIdAlfresco() {
        return idAlfresco;
    }

    public void setIdAlfresco(String idAlfresco) {
        this.idAlfresco = idAlfresco;
    }

    public Integer getLoginAttempts() {
        return loginAttempts;
    }

    public void setLoginAttempts(Integer loginAttempts) {
        this.loginAttempts = loginAttempts;
    }

    public LocalDate getLastUpdatePasswordDate() {
        return lastUpdatePasswordDate;
    }

    public void setLastUpdatePasswordDate(LocalDate lastUpdatePasswordDate) {
        this.lastUpdatePasswordDate = lastUpdatePasswordDate;
    }

    public String getPasswordResetKey() {
        return passwordResetKey;
    }

    public void setPasswordResetKey(String passwordResetKey) {
        this.passwordResetKey = passwordResetKey;
    }

    public Integer getPin() {
        return pin;
    }

    public void setPin(Integer pin) {
        this.pin = pin;
    }

    public Long getGearOrganizationalUnitId() {
        return gearOrganizationalUnitId;
    }

    public void setGearOrganizationalUnitId(Long gearOrganizationalUnitId) {
        this.gearOrganizationalUnitId = gearOrganizationalUnitId;
    }

    public String getGearOrganizationalUnitName() {
        return gearOrganizationalUnitName;
    }

    public void setGearOrganizationalUnitName(String gearOrganizationalUnitName) {
        this.gearOrganizationalUnitName = gearOrganizationalUnitName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearUserDTO gearUserDTO = (GearUserDTO) o;
        if (gearUserDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearUserDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearUserDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", password='" + getPassword() + "'" +
            ", email='" + getEmail() + "'" +
            ", avatar='" + getAvatar() + "'" +
            ", profile='" + getProfile() + "'" +
            ", state='" + isState() + "'" +
            ", idAlfresco='" + getIdAlfresco() + "'" +
            ", loginAttempts=" + getLoginAttempts() +
            ", lastUpdatePasswordDate='" + getLastUpdatePasswordDate() + "'" +
            ", passwordResetKey='" + getPasswordResetKey() + "'" +
            ", pin=" + getPin() +
            ", gearOrganizationalUnit=" + getGearOrganizationalUnitId() +
            ", gearOrganizationalUnit='" + getGearOrganizationalUnitName() + "'" +
            "}";
    }
}
