package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearOrganizationalUnit.
 */
@Entity
@Table(name = "gear_organizational_unit")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearOrganizationalUnit implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "node_id_alfresco")
    private String nodeIdAlfresco;

    @Column(name = "site_id")
    private String siteId;

    @Column(name = "site_guid")
    private String siteGuid;

    @Column(name = "lowercase_restrictions")
    private Integer lowercaseRestrictions;

    @Column(name = "uppercase_restrictions")
    private Integer uppercaseRestrictions;

    @Column(name = "special_characters_restrictions")
    private Integer specialCharactersRestrictions;

    @Column(name = "digits_restrictions")
    private Integer digitsRestrictions;

    @Column(name = "minimum_length_restrictions")
    private Integer minimumLengthRestrictions;

    @Column(name = "maximum_length_restriction")
    private Integer maximumLengthRestriction;

    @Column(name = "regex_correo_restriction")
    private String regexCorreoRestriction;

    @Column(name = "maximum_attemps_restriction")
    private Integer maximumAttempsRestriction;

    @Column(name = "automatic_lock_email")
    private String automaticLockEmail;

    @Column(name = "manual_lock_email")
    private String manualLockEmail;

    @Column(name = "reset_password_email")
    private String resetPasswordEmail;

    @Column(name = "password_expires_days")
    private Integer passwordExpiresDays;

    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDomain> gearDomains = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearUser> gearUsers = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearPortfolio> gearPortfolios = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearGoalsStrategyAE> gearGoalsStrategyAES = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearValueChainCategory> gearValueChainCategories = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearInformationSystems> gearInformationSystems = new HashSet<>();
    @OneToMany(mappedBy = "gearOrganizationalUnit")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearSurvey> gearSurveys = new HashSet<>();
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

    public GearOrganizationalUnit name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNodeIdAlfresco() {
        return nodeIdAlfresco;
    }

    public GearOrganizationalUnit nodeIdAlfresco(String nodeIdAlfresco) {
        this.nodeIdAlfresco = nodeIdAlfresco;
        return this;
    }

    public void setNodeIdAlfresco(String nodeIdAlfresco) {
        this.nodeIdAlfresco = nodeIdAlfresco;
    }

    public String getSiteId() {
        return siteId;
    }

    public GearOrganizationalUnit siteId(String siteId) {
        this.siteId = siteId;
        return this;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getSiteGuid() {
        return siteGuid;
    }

    public GearOrganizationalUnit siteGuid(String siteGuid) {
        this.siteGuid = siteGuid;
        return this;
    }

    public void setSiteGuid(String siteGuid) {
        this.siteGuid = siteGuid;
    }

    public Integer getLowercaseRestrictions() {
        return lowercaseRestrictions;
    }

    public GearOrganizationalUnit lowercaseRestrictions(Integer lowercaseRestrictions) {
        this.lowercaseRestrictions = lowercaseRestrictions;
        return this;
    }

    public void setLowercaseRestrictions(Integer lowercaseRestrictions) {
        this.lowercaseRestrictions = lowercaseRestrictions;
    }

    public Integer getUppercaseRestrictions() {
        return uppercaseRestrictions;
    }

    public GearOrganizationalUnit uppercaseRestrictions(Integer uppercaseRestrictions) {
        this.uppercaseRestrictions = uppercaseRestrictions;
        return this;
    }

    public void setUppercaseRestrictions(Integer uppercaseRestrictions) {
        this.uppercaseRestrictions = uppercaseRestrictions;
    }

    public Integer getSpecialCharactersRestrictions() {
        return specialCharactersRestrictions;
    }

    public GearOrganizationalUnit specialCharactersRestrictions(Integer specialCharactersRestrictions) {
        this.specialCharactersRestrictions = specialCharactersRestrictions;
        return this;
    }

    public void setSpecialCharactersRestrictions(Integer specialCharactersRestrictions) {
        this.specialCharactersRestrictions = specialCharactersRestrictions;
    }

    public Integer getDigitsRestrictions() {
        return digitsRestrictions;
    }

    public GearOrganizationalUnit digitsRestrictions(Integer digitsRestrictions) {
        this.digitsRestrictions = digitsRestrictions;
        return this;
    }

    public void setDigitsRestrictions(Integer digitsRestrictions) {
        this.digitsRestrictions = digitsRestrictions;
    }

    public Integer getMinimumLengthRestrictions() {
        return minimumLengthRestrictions;
    }

    public GearOrganizationalUnit minimumLengthRestrictions(Integer minimumLengthRestrictions) {
        this.minimumLengthRestrictions = minimumLengthRestrictions;
        return this;
    }

    public void setMinimumLengthRestrictions(Integer minimumLengthRestrictions) {
        this.minimumLengthRestrictions = minimumLengthRestrictions;
    }

    public Integer getMaximumLengthRestriction() {
        return maximumLengthRestriction;
    }

    public GearOrganizationalUnit maximumLengthRestriction(Integer maximumLengthRestriction) {
        this.maximumLengthRestriction = maximumLengthRestriction;
        return this;
    }

    public void setMaximumLengthRestriction(Integer maximumLengthRestriction) {
        this.maximumLengthRestriction = maximumLengthRestriction;
    }

    public String getRegexCorreoRestriction() {
        return regexCorreoRestriction;
    }

    public GearOrganizationalUnit regexCorreoRestriction(String regexCorreoRestriction) {
        this.regexCorreoRestriction = regexCorreoRestriction;
        return this;
    }

    public void setRegexCorreoRestriction(String regexCorreoRestriction) {
        this.regexCorreoRestriction = regexCorreoRestriction;
    }

    public Integer getMaximumAttempsRestriction() {
        return maximumAttempsRestriction;
    }

    public GearOrganizationalUnit maximumAttempsRestriction(Integer maximumAttempsRestriction) {
        this.maximumAttempsRestriction = maximumAttempsRestriction;
        return this;
    }

    public void setMaximumAttempsRestriction(Integer maximumAttempsRestriction) {
        this.maximumAttempsRestriction = maximumAttempsRestriction;
    }

    public String getAutomaticLockEmail() {
        return automaticLockEmail;
    }

    public GearOrganizationalUnit automaticLockEmail(String automaticLockEmail) {
        this.automaticLockEmail = automaticLockEmail;
        return this;
    }

    public void setAutomaticLockEmail(String automaticLockEmail) {
        this.automaticLockEmail = automaticLockEmail;
    }

    public String getManualLockEmail() {
        return manualLockEmail;
    }

    public GearOrganizationalUnit manualLockEmail(String manualLockEmail) {
        this.manualLockEmail = manualLockEmail;
        return this;
    }

    public void setManualLockEmail(String manualLockEmail) {
        this.manualLockEmail = manualLockEmail;
    }

    public String getResetPasswordEmail() {
        return resetPasswordEmail;
    }

    public GearOrganizationalUnit resetPasswordEmail(String resetPasswordEmail) {
        this.resetPasswordEmail = resetPasswordEmail;
        return this;
    }

    public void setResetPasswordEmail(String resetPasswordEmail) {
        this.resetPasswordEmail = resetPasswordEmail;
    }

    public Integer getPasswordExpiresDays() {
        return passwordExpiresDays;
    }

    public GearOrganizationalUnit passwordExpiresDays(Integer passwordExpiresDays) {
        this.passwordExpiresDays = passwordExpiresDays;
        return this;
    }

    public void setPasswordExpiresDays(Integer passwordExpiresDays) {
        this.passwordExpiresDays = passwordExpiresDays;
    }

    public Set<GearDomain> getGearDomains() {
        return gearDomains;
    }

    public GearOrganizationalUnit gearDomains(Set<GearDomain> gearDomains) {
        this.gearDomains = gearDomains;
        return this;
    }

    public GearOrganizationalUnit addGearDomain(GearDomain gearDomain) {
        this.gearDomains.add(gearDomain);
        gearDomain.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearDomain(GearDomain gearDomain) {
        this.gearDomains.remove(gearDomain);
        gearDomain.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearDomains(Set<GearDomain> gearDomains) {
        this.gearDomains = gearDomains;
    }

    public Set<GearUser> getGearUsers() {
        return gearUsers;
    }

    public GearOrganizationalUnit gearUsers(Set<GearUser> gearUsers) {
        this.gearUsers = gearUsers;
        return this;
    }

    public GearOrganizationalUnit addGearUser(GearUser gearUser) {
        this.gearUsers.add(gearUser);
        gearUser.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearUser(GearUser gearUser) {
        this.gearUsers.remove(gearUser);
        gearUser.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearUsers(Set<GearUser> gearUsers) {
        this.gearUsers = gearUsers;
    }

    public Set<GearPortfolio> getGearPortfolios() {
        return gearPortfolios;
    }

    public GearOrganizationalUnit gearPortfolios(Set<GearPortfolio> gearPortfolios) {
        this.gearPortfolios = gearPortfolios;
        return this;
    }

    public GearOrganizationalUnit addGearPortfolio(GearPortfolio gearPortfolio) {
        this.gearPortfolios.add(gearPortfolio);
        gearPortfolio.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearPortfolio(GearPortfolio gearPortfolio) {
        this.gearPortfolios.remove(gearPortfolio);
        gearPortfolio.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearPortfolios(Set<GearPortfolio> gearPortfolios) {
        this.gearPortfolios = gearPortfolios;
    }

    public Set<GearGoalsStrategyAE> getGearGoalsStrategyAES() {
        return gearGoalsStrategyAES;
    }

    public GearOrganizationalUnit gearGoalsStrategyAES(Set<GearGoalsStrategyAE> gearGoalsStrategyAES) {
        this.gearGoalsStrategyAES = gearGoalsStrategyAES;
        return this;
    }

    public GearOrganizationalUnit addGearGoalsStrategyAE(GearGoalsStrategyAE gearGoalsStrategyAE) {
        this.gearGoalsStrategyAES.add(gearGoalsStrategyAE);
        gearGoalsStrategyAE.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearGoalsStrategyAE(GearGoalsStrategyAE gearGoalsStrategyAE) {
        this.gearGoalsStrategyAES.remove(gearGoalsStrategyAE);
        gearGoalsStrategyAE.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearGoalsStrategyAES(Set<GearGoalsStrategyAE> gearGoalsStrategyAES) {
        this.gearGoalsStrategyAES = gearGoalsStrategyAES;
    }

    public Set<GearValueChainCategory> getGearValueChainCategories() {
        return gearValueChainCategories;
    }

    public GearOrganizationalUnit gearValueChainCategories(Set<GearValueChainCategory> gearValueChainCategories) {
        this.gearValueChainCategories = gearValueChainCategories;
        return this;
    }

    public GearOrganizationalUnit addGearValueChainCategory(GearValueChainCategory gearValueChainCategory) {
        this.gearValueChainCategories.add(gearValueChainCategory);
        gearValueChainCategory.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearValueChainCategory(GearValueChainCategory gearValueChainCategory) {
        this.gearValueChainCategories.remove(gearValueChainCategory);
        gearValueChainCategory.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearValueChainCategories(Set<GearValueChainCategory> gearValueChainCategories) {
        this.gearValueChainCategories = gearValueChainCategories;
    }

    public Set<GearInformationSystems> getGearInformationSystems() {
        return gearInformationSystems;
    }

    public GearOrganizationalUnit gearInformationSystems(Set<GearInformationSystems> gearInformationSystems) {
        this.gearInformationSystems = gearInformationSystems;
        return this;
    }

    public GearOrganizationalUnit addGearInformationSystems(GearInformationSystems gearInformationSystems) {
        this.gearInformationSystems.add(gearInformationSystems);
        gearInformationSystems.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearInformationSystems(GearInformationSystems gearInformationSystems) {
        this.gearInformationSystems.remove(gearInformationSystems);
        gearInformationSystems.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearInformationSystems(Set<GearInformationSystems> gearInformationSystems) {
        this.gearInformationSystems = gearInformationSystems;
    }

    public Set<GearSurvey> getGearSurveys() {
        return gearSurveys;
    }

    public GearOrganizationalUnit gearSurveys(Set<GearSurvey> gearSurveys) {
        this.gearSurveys = gearSurveys;
        return this;
    }

    public GearOrganizationalUnit addGearSurvey(GearSurvey gearSurvey) {
        this.gearSurveys.add(gearSurvey);
        gearSurvey.setGearOrganizationalUnit(this);
        return this;
    }

    public GearOrganizationalUnit removeGearSurvey(GearSurvey gearSurvey) {
        this.gearSurveys.remove(gearSurvey);
        gearSurvey.setGearOrganizationalUnit(null);
        return this;
    }

    public void setGearSurveys(Set<GearSurvey> gearSurveys) {
        this.gearSurveys = gearSurveys;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        GearOrganizationalUnit gearOrganizationalUnit = (GearOrganizationalUnit) o;
        if (gearOrganizationalUnit.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearOrganizationalUnit.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearOrganizationalUnit{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nodeIdAlfresco='" + getNodeIdAlfresco() + "'" +
            ", siteId='" + getSiteId() + "'" +
            ", siteGuid='" + getSiteGuid() + "'" +
            ", lowercaseRestrictions=" + getLowercaseRestrictions() +
            ", uppercaseRestrictions=" + getUppercaseRestrictions() +
            ", specialCharactersRestrictions=" + getSpecialCharactersRestrictions() +
            ", digitsRestrictions=" + getDigitsRestrictions() +
            ", minimumLengthRestrictions=" + getMinimumLengthRestrictions() +
            ", maximumLengthRestriction=" + getMaximumLengthRestriction() +
            ", regexCorreoRestriction='" + getRegexCorreoRestriction() + "'" +
            ", maximumAttempsRestriction=" + getMaximumAttempsRestriction() +
            ", automaticLockEmail='" + getAutomaticLockEmail() + "'" +
            ", manualLockEmail='" + getManualLockEmail() + "'" +
            ", resetPasswordEmail='" + getResetPasswordEmail() + "'" +
            ", passwordExpiresDays=" + getPasswordExpiresDays() +
            "}";
    }
}
