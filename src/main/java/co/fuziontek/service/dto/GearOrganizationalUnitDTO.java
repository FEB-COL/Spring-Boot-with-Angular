package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearOrganizationalUnit entity.
 */
public class GearOrganizationalUnitDTO implements Serializable {

    private Long id;

    private String name;

    private String nodeIdAlfresco;

    private String siteId;

    private String siteGuid;

    private Integer lowercaseRestrictions;

    private Integer uppercaseRestrictions;

    private Integer specialCharactersRestrictions;

    private Integer digitsRestrictions;

    private Integer minimumLengthRestrictions;

    private Integer maximumLengthRestriction;

    private String regexCorreoRestriction;

    private Integer maximumAttempsRestriction;

    private String automaticLockEmail;

    private String manualLockEmail;

    private String resetPasswordEmail;

    private Integer passwordExpiresDays;

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

    public String getNodeIdAlfresco() {
        return nodeIdAlfresco;
    }

    public void setNodeIdAlfresco(String nodeIdAlfresco) {
        this.nodeIdAlfresco = nodeIdAlfresco;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public String getSiteGuid() {
        return siteGuid;
    }

    public void setSiteGuid(String siteGuid) {
        this.siteGuid = siteGuid;
    }

    public Integer getLowercaseRestrictions() {
        return lowercaseRestrictions;
    }

    public void setLowercaseRestrictions(Integer lowercaseRestrictions) {
        this.lowercaseRestrictions = lowercaseRestrictions;
    }

    public Integer getUppercaseRestrictions() {
        return uppercaseRestrictions;
    }

    public void setUppercaseRestrictions(Integer uppercaseRestrictions) {
        this.uppercaseRestrictions = uppercaseRestrictions;
    }

    public Integer getSpecialCharactersRestrictions() {
        return specialCharactersRestrictions;
    }

    public void setSpecialCharactersRestrictions(Integer specialCharactersRestrictions) {
        this.specialCharactersRestrictions = specialCharactersRestrictions;
    }

    public Integer getDigitsRestrictions() {
        return digitsRestrictions;
    }

    public void setDigitsRestrictions(Integer digitsRestrictions) {
        this.digitsRestrictions = digitsRestrictions;
    }

    public Integer getMinimumLengthRestrictions() {
        return minimumLengthRestrictions;
    }

    public void setMinimumLengthRestrictions(Integer minimumLengthRestrictions) {
        this.minimumLengthRestrictions = minimumLengthRestrictions;
    }

    public Integer getMaximumLengthRestriction() {
        return maximumLengthRestriction;
    }

    public void setMaximumLengthRestriction(Integer maximumLengthRestriction) {
        this.maximumLengthRestriction = maximumLengthRestriction;
    }

    public String getRegexCorreoRestriction() {
        return regexCorreoRestriction;
    }

    public void setRegexCorreoRestriction(String regexCorreoRestriction) {
        this.regexCorreoRestriction = regexCorreoRestriction;
    }

    public Integer getMaximumAttempsRestriction() {
        return maximumAttempsRestriction;
    }

    public void setMaximumAttempsRestriction(Integer maximumAttempsRestriction) {
        this.maximumAttempsRestriction = maximumAttempsRestriction;
    }

    public String getAutomaticLockEmail() {
        return automaticLockEmail;
    }

    public void setAutomaticLockEmail(String automaticLockEmail) {
        this.automaticLockEmail = automaticLockEmail;
    }

    public String getManualLockEmail() {
        return manualLockEmail;
    }

    public void setManualLockEmail(String manualLockEmail) {
        this.manualLockEmail = manualLockEmail;
    }

    public String getResetPasswordEmail() {
        return resetPasswordEmail;
    }

    public void setResetPasswordEmail(String resetPasswordEmail) {
        this.resetPasswordEmail = resetPasswordEmail;
    }

    public Integer getPasswordExpiresDays() {
        return passwordExpiresDays;
    }

    public void setPasswordExpiresDays(Integer passwordExpiresDays) {
        this.passwordExpiresDays = passwordExpiresDays;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        GearOrganizationalUnitDTO gearOrganizationalUnitDTO = (GearOrganizationalUnitDTO) o;
        if (gearOrganizationalUnitDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearOrganizationalUnitDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearOrganizationalUnitDTO{" +
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
