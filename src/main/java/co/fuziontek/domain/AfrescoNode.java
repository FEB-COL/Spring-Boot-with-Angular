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
 * A AfrescoNode.
 */
@Entity
@Table(name = "afresco_node")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AfrescoNode implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "modified_at")
    private String modifiedAt;

    @Column(name = "name")
    private String name;

    @Column(name = "location")
    private String location;

    @Column(name = "n_type")
    private String nType;

    @Column(name = "parent_id")
    private String parentId;

    @OneToMany(mappedBy = "alfrescoNode")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AlfrescoNodeProperties> alfrescoProperties = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("alfrescoNodes")
    private AlfrescoSite alfrescoSite;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public AfrescoNode createdAt(String createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getModifiedAt() {
        return modifiedAt;
    }

    public AfrescoNode modifiedAt(String modifiedAt) {
        this.modifiedAt = modifiedAt;
        return this;
    }

    public void setModifiedAt(String modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public String getName() {
        return name;
    }

    public AfrescoNode name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public AfrescoNode location(String location) {
        this.location = location;
        return this;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getnType() {
        return nType;
    }

    public AfrescoNode nType(String nType) {
        this.nType = nType;
        return this;
    }

    public void setnType(String nType) {
        this.nType = nType;
    }

    public String getParentId() {
        return parentId;
    }

    public AfrescoNode parentId(String parentId) {
        this.parentId = parentId;
        return this;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public Set<AlfrescoNodeProperties> getAlfrescoProperties() {
        return alfrescoProperties;
    }

    public AfrescoNode alfrescoProperties(Set<AlfrescoNodeProperties> alfrescoNodeProperties) {
        this.alfrescoProperties = alfrescoNodeProperties;
        return this;
    }

    public AfrescoNode addAlfrescoProperties(AlfrescoNodeProperties alfrescoNodeProperties) {
        this.alfrescoProperties.add(alfrescoNodeProperties);
        alfrescoNodeProperties.setAlfrescoNode(this);
        return this;
    }

    public AfrescoNode removeAlfrescoProperties(AlfrescoNodeProperties alfrescoNodeProperties) {
        this.alfrescoProperties.remove(alfrescoNodeProperties);
        alfrescoNodeProperties.setAlfrescoNode(null);
        return this;
    }

    public void setAlfrescoProperties(Set<AlfrescoNodeProperties> alfrescoNodeProperties) {
        this.alfrescoProperties = alfrescoNodeProperties;
    }

    public AlfrescoSite getAlfrescoSite() {
        return alfrescoSite;
    }

    public AfrescoNode alfrescoSite(AlfrescoSite alfrescoSite) {
        this.alfrescoSite = alfrescoSite;
        return this;
    }

    public void setAlfrescoSite(AlfrescoSite alfrescoSite) {
        this.alfrescoSite = alfrescoSite;
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
        AfrescoNode afrescoNode = (AfrescoNode) o;
        if (afrescoNode.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), afrescoNode.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AfrescoNode{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", name='" + getName() + "'" +
            ", location='" + getLocation() + "'" +
            ", nType='" + getnType() + "'" +
            ", parentId='" + getParentId() + "'" +
            "}";
    }
}
