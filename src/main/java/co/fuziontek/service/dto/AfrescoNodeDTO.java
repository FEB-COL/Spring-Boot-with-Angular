package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AfrescoNode entity.
 */
public class AfrescoNodeDTO implements Serializable {

    private Long id;

    private String createdAt;

    private String modifiedAt;

    private String name;

    private String location;

    private String nType;

    private String parentId;

    private Long alfrescoSiteId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(String modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getnType() {
        return nType;
    }

    public void setnType(String nType) {
        this.nType = nType;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public Long getAlfrescoSiteId() {
        return alfrescoSiteId;
    }

    public void setAlfrescoSiteId(Long alfrescoSiteId) {
        this.alfrescoSiteId = alfrescoSiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AfrescoNodeDTO afrescoNodeDTO = (AfrescoNodeDTO) o;
        if (afrescoNodeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), afrescoNodeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AfrescoNodeDTO{" +
            "id=" + getId() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", modifiedAt='" + getModifiedAt() + "'" +
            ", name='" + getName() + "'" +
            ", location='" + getLocation() + "'" +
            ", nType='" + getnType() + "'" +
            ", parentId='" + getParentId() + "'" +
            ", alfrescoSite=" + getAlfrescoSiteId() +
            "}";
    }
}
