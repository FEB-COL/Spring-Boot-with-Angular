package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A GearDomain.
 */
@Entity
@Table(name = "gear_domain")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDomain implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "domain_id")
    private String domainId;

    @Column(name = "company_id")
    private Integer companyId;

    @Column(name = "company_description")
    private String companyDescription;

    @Column(name = "site_id")
    private String siteId;

    @Column(name = "jhi_storage")
    private Double jhiStorage;

    @Column(name = "storage_used")
    private Double storageUsed;

    @Column(name = "level_maturity")
    private Integer levelMaturity;

    @Column(name = "total_wiki")
    private Integer totalWiki;

    @Column(name = "total_file_final_version")
    private Integer totalFileFinalVersion;

    @Column(name = "total_file_draft")
    private Integer totalFileDraft;

    @Column(name = "total_file_upload")
    private Integer totalFileUpload;

    @OneToMany(mappedBy = "geardomain")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDocumentType> geardocumenttypes = new HashSet<>();
    @OneToMany(mappedBy = "gearDomain")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearAmbit> gearAmbits = new HashSet<>();
    @OneToMany(mappedBy = "gearDomain")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearFiles> gearFiles = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("gearDomains")
    private GearOrganizationalUnit gearOrganizationalUnit;

    @OneToMany(mappedBy = "gearDomain")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<GearDiagnosis> gearDiagnoses = new HashSet<>();
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

    public GearDomain name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomainId() {
        return domainId;
    }

    public GearDomain domainId(String domainId) {
        this.domainId = domainId;
        return this;
    }

    public void setDomainId(String domainId) {
        this.domainId = domainId;
    }

    public Integer getCompanyId() {
        return companyId;
    }

    public GearDomain companyId(Integer companyId) {
        this.companyId = companyId;
        return this;
    }

    public void setCompanyId(Integer companyId) {
        this.companyId = companyId;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public GearDomain companyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
        return this;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public String getSiteId() {
        return siteId;
    }

    public GearDomain siteId(String siteId) {
        this.siteId = siteId;
        return this;
    }

    public void setSiteId(String siteId) {
        this.siteId = siteId;
    }

    public Double getJhiStorage() {
        return jhiStorage;
    }

    public GearDomain jhiStorage(Double jhiStorage) {
        this.jhiStorage = jhiStorage;
        return this;
    }

    public void setJhiStorage(Double jhiStorage) {
        this.jhiStorage = jhiStorage;
    }

    public Double getStorageUsed() {
        return storageUsed;
    }

    public GearDomain storageUsed(Double storageUsed) {
        this.storageUsed = storageUsed;
        return this;
    }

    public void setStorageUsed(Double storageUsed) {
        this.storageUsed = storageUsed;
    }

    public Integer getLevelMaturity() {
        return levelMaturity;
    }

    public GearDomain levelMaturity(Integer levelMaturity) {
        this.levelMaturity = levelMaturity;
        return this;
    }

    public void setLevelMaturity(Integer levelMaturity) {
        this.levelMaturity = levelMaturity;
    }

    public Integer getTotalWiki() {
        return totalWiki;
    }

    public GearDomain totalWiki(Integer totalWiki) {
        this.totalWiki = totalWiki;
        return this;
    }

    public void setTotalWiki(Integer totalWiki) {
        this.totalWiki = totalWiki;
    }

    public Integer getTotalFileFinalVersion() {
        return totalFileFinalVersion;
    }

    public GearDomain totalFileFinalVersion(Integer totalFileFinalVersion) {
        this.totalFileFinalVersion = totalFileFinalVersion;
        return this;
    }

    public void setTotalFileFinalVersion(Integer totalFileFinalVersion) {
        this.totalFileFinalVersion = totalFileFinalVersion;
    }

    public Integer getTotalFileDraft() {
        return totalFileDraft;
    }

    public GearDomain totalFileDraft(Integer totalFileDraft) {
        this.totalFileDraft = totalFileDraft;
        return this;
    }

    public void setTotalFileDraft(Integer totalFileDraft) {
        this.totalFileDraft = totalFileDraft;
    }

    public Integer getTotalFileUpload() {
        return totalFileUpload;
    }

    public GearDomain totalFileUpload(Integer totalFileUpload) {
        this.totalFileUpload = totalFileUpload;
        return this;
    }

    public void setTotalFileUpload(Integer totalFileUpload) {
        this.totalFileUpload = totalFileUpload;
    }

    public Set<GearDocumentType> getGeardocumenttypes() {
        return geardocumenttypes;
    }

    public GearDomain geardocumenttypes(Set<GearDocumentType> gearDocumentTypes) {
        this.geardocumenttypes = gearDocumentTypes;
        return this;
    }

    public GearDomain addGeardocumenttype(GearDocumentType gearDocumentType) {
        this.geardocumenttypes.add(gearDocumentType);
        gearDocumentType.setGeardomain(this);
        return this;
    }

    public GearDomain removeGeardocumenttype(GearDocumentType gearDocumentType) {
        this.geardocumenttypes.remove(gearDocumentType);
        gearDocumentType.setGeardomain(null);
        return this;
    }

    public void setGeardocumenttypes(Set<GearDocumentType> gearDocumentTypes) {
        this.geardocumenttypes = gearDocumentTypes;
    }

    public Set<GearAmbit> getGearAmbits() {
        return gearAmbits;
    }

    public GearDomain gearAmbits(Set<GearAmbit> gearAmbits) {
        this.gearAmbits = gearAmbits;
        return this;
    }

    public GearDomain addGearAmbit(GearAmbit gearAmbit) {
        this.gearAmbits.add(gearAmbit);
        gearAmbit.setGearDomain(this);
        return this;
    }

    public GearDomain removeGearAmbit(GearAmbit gearAmbit) {
        this.gearAmbits.remove(gearAmbit);
        gearAmbit.setGearDomain(null);
        return this;
    }

    public void setGearAmbits(Set<GearAmbit> gearAmbits) {
        this.gearAmbits = gearAmbits;
    }

    public Set<GearFiles> getGearFiles() {
        return gearFiles;
    }

    public GearDomain gearFiles(Set<GearFiles> gearFiles) {
        this.gearFiles = gearFiles;
        return this;
    }

    public GearDomain addGearFiles(GearFiles gearFiles) {
        this.gearFiles.add(gearFiles);
        gearFiles.setGearDomain(this);
        return this;
    }

    public GearDomain removeGearFiles(GearFiles gearFiles) {
        this.gearFiles.remove(gearFiles);
        gearFiles.setGearDomain(null);
        return this;
    }

    public void setGearFiles(Set<GearFiles> gearFiles) {
        this.gearFiles = gearFiles;
    }

    public GearOrganizationalUnit getGearOrganizationalUnit() {
        return gearOrganizationalUnit;
    }

    public GearDomain gearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
        return this;
    }

    public void setGearOrganizationalUnit(GearOrganizationalUnit gearOrganizationalUnit) {
        this.gearOrganizationalUnit = gearOrganizationalUnit;
    }

    public Set<GearDiagnosis> getGearDiagnoses() {
        return gearDiagnoses;
    }

    public GearDomain gearDiagnoses(Set<GearDiagnosis> gearDiagnoses) {
        this.gearDiagnoses = gearDiagnoses;
        return this;
    }

    public GearDomain addGearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnoses.add(gearDiagnosis);
        gearDiagnosis.setGearDomain(this);
        return this;
    }

    public GearDomain removeGearDiagnosis(GearDiagnosis gearDiagnosis) {
        this.gearDiagnoses.remove(gearDiagnosis);
        gearDiagnosis.setGearDomain(null);
        return this;
    }

    public void setGearDiagnoses(Set<GearDiagnosis> gearDiagnoses) {
        this.gearDiagnoses = gearDiagnoses;
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
        GearDomain gearDomain = (GearDomain) o;
        if (gearDomain.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDomain.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDomain{" +
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
            "}";
    }
}
