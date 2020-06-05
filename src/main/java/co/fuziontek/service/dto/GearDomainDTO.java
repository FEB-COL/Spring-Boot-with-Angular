package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the GearDomain entity.
 */
public class GearDomainDTO implements Serializable {

    private Long id;

    private String name;

    private String domainId;

    private Integer companyId;

    private String companyDescription;

    private String siteId;

    private Double jhiStorage;

    private Double storageUsed;

    private Integer levelMaturity;

    private Integer totalWiki;

    private Integer totalFileFinalVersion;

    private Integer totalFileDraft;

    private Integer totalFileUpload;

    private Long gearOrganizationalUnitId;

    private String gearOrganizationalUnitName;

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

    public String getDomainId() {
        return domainId;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public String getSiteId() {
        return siteId;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public Double getJhiStorage() {
        return jhiStorage;
    }

    public void setJhiStorage(Double jhiStorage) {
        this.jhiStorage = jhiStorage;
    }

    public Double getStorageUsed() {
        return storageUsed;
    }

    public void setStorageUsed(Double storageUsed) {
        this.storageUsed = storageUsed;
    }

    public Integer getLevelMaturity() {
        return levelMaturity;
    }

    public void setLevelMaturity(Integer levelMaturity) {
        this.levelMaturity = levelMaturity;
    }

    public Integer getTotalWiki() {
        return totalWiki;
    }

    public void setTotalWiki(Integer totalWiki) {
        this.totalWiki = totalWiki;
    }

    public Integer getTotalFileFinalVersion() {
        return totalFileFinalVersion;
    }

    public void setTotalFileFinalVersion(Integer totalFileFinalVersion) {
        this.totalFileFinalVersion = totalFileFinalVersion;
    }

    public Integer getTotalFileDraft() {
        return totalFileDraft;
    }

    public void setTotalFileDraft(Integer totalFileDraft) {
        this.totalFileDraft = totalFileDraft;
    }

    public Integer getTotalFileUpload() {
        return totalFileUpload;
    }

    public void setTotalFileUpload(Integer totalFileUpload) {
        this.totalFileUpload = totalFileUpload;
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

        GearDomainDTO gearDomainDTO = (GearDomainDTO) o;
        if (gearDomainDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDomainDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDomainDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", domainId='" + getDomainId() + "'" +
            ", companyId=" + getCompanyId() +
            ", companyDescription='" + getCompanyDescription() + "'" +
            ", siteId='" + getSiteId() + "'" +
            ", jhiStorage=" + getJhiStorage() +
            ", storageUsed=" + getStorageUsed() +
            ", levelMaturity=" + getLevelMaturity() +
            ", totalWiki=" + getTotalWiki() +
            ", totalFileFinalVersion=" + getTotalFileFinalVersion() +
            ", totalFileDraft=" + getTotalFileDraft() +
            ", totalFileUpload=" + getTotalFileUpload() +
            ", gearOrganizationalUnit=" + getGearOrganizationalUnitId() +
            ", gearOrganizationalUnit='" + getGearOrganizationalUnitName() + "'" +
            "}";
    }
}
