package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearUser.
 */
@Entity
@Table(name = "gear_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearUser implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
//    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator") //se debe quitar por que ya no generara id automatico por la relacion directa por el user de jhipster OJO
//    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "jhi_password")
    private String password;

    @Column(name = "email")
    private String email;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "jhi_profile")
    private String profile;

    @Column(name = "state")
    private Boolean state;

    @Column(name = "id_alfresco")
    private String idAlfresco;

    @Column(name = "login_attempts")
    private Integer loginAttempts;

    @Column(name = "last_update_password_date")
    private LocalDate lastUpdatePasswordDate;

    @Column(name = "password_reset_key")
    private String passwordResetKey;

    @Column(name = "pin")
    private Integer pin;

    @ManyToOne
    @JsonIgnoreProperties("gearUsers")
    private GearOrganizationalUnit gearOrganizationalUnit;

    // esta es la relacion de realizamos con user para que tenga los mismmo privilegios ojo con esta parte
    // enlace de la documentacion que se utilizo
    //https://www.jhipster.tech/tips/022_tip_registering_user_with_additional_information.html
//    @OneToOne
//    @MapsId
//    private User user;

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Boolean getState() {
        return state;
    }

//    public User getUser() {
//        return user;
//    }

//    public void setUser(User user) {
//        this.user = user;
//    }

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public GearUser name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPassword() {
        return password;
    }

    public GearUser password(String password) {
        this.password = password;
        return this;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public GearUser email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAvatar() {
        return avatar;
    }

    public GearUser avatar(String avatar) {
        this.avatar = avatar;
        return this;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getProfile() {
        return profile;
    }

    public GearUser profile(String profile) {
        this.profile = profile;
        return this;
    }

    public void setProfile(String profile) {
        this.profile = profile;
    }

    public Boolean isState() {
        return state;
    }

    public GearUser state(Boolean state) {
        this.state = state;
        return this;
    }

    public void setState(Boolean state) {
        this.state = state;
    }

    public String getIdAlfresco() {
        return idAlfresco;
    }

    public GearUser idAlfresco(String idAlfresco) {
        this.idAlfresco = idAlfresco;
        return this;
    }

    public void setIdAlfresco(String idAlfresco) {
        this.idAlfresco = idAlfresco;
    }

    public Integer getLoginAttempts() {
        return loginAttempts;
    }

    public GearUser loginAttempts(Integer loginAttempts) {
        this.loginAttempts = loginAttempts;
        return this;
    }

    public void setLoginAttempts(Integer loginAttempts) {
        this.loginAttempts = loginAttempts;
    }

    public LocalDate getLastUpdatePasswordDate() {
        return lastUpdatePasswordDate;
    }

    public GearUser lastUpdatePasswordDate(LocalDate lastUpdatePasswordDate) {
        this.lastUpdatePasswordDate = lastUpdatePasswordDate;
        return this;
    }

    public void setLastUpdatePasswordDate(LocalDate lastUpdatePasswordDate) {
        this.lastUpdatePasswordDate = lastUpdatePasswordDate;
    }

    public String getPasswordResetKey() {
        return passwordResetKey;
    }

    public GearUser passwordResetKey(String passwordResetKey) {
        this.passwordResetKey = passwordResetKey;
        return this;
    }

    public void setPasswordResetKey(String passwordResetKey) {
        this.passwordResetKey = passwordResetKey;
    }

    public Integer getPin() {
        return pin;
    }

    public GearUser pin(Integer pin) {
        this.pin = pin;
        return this;
    }

    public void setPin(Integer pin) {
        this.pin = pin;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearUser gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
        return this;
    }

    public void setGearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
    }

//    public Set<GearSurveySolve> getGearSurveySolves() {
//        return gearSurveySolves;
//    }
//
//    public GearUser gearSurveySolves(Set<GearSurveySolve> gearSurveySolves) {
//        this.gearSurveySolves = gearSurveySolves;
//        return this;
//    }
//
//    public GearUser addGearSurveySolve(GearSurveySolve gearSurveySolve) {
//        this.gearSurveySolves.add(gearSurveySolve);
//        gearSurveySolve.setGearUser(this);
//        return this;
//    }
//
//    public GearUser removeGearSurveySolve(GearSurveySolve gearSurveySolve) {
//        this.gearSurveySolves.remove(gearSurveySolve);
//        gearSurveySolve.setGearUser(null);
//        return this;
//    }
//
//    public void setGearSurveySolves(Set<GearSurveySolve> gearSurveySolves) {
//        this.gearSurveySolves = gearSurveySolves;
//    }
//    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GearUser gearUser = (GearUser) o;
        if (gearUser.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearUser.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearUser{" +
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
            "}";
    }
}
