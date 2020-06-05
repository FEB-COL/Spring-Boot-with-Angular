package co.fuziontek.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the AlfrescoSite entity.
 */
public class AlfrescoSiteDTO implements Serializable {

    private Long id;

    private String guid;

    private String identify;

    private String role;

    private String title;

    private String description;

    private String visibility;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getIdentify() {
        return identify;
    }

    public void setIdentify(String identify) {
        this.identify = identify;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        AlfrescoSiteDTO alfrescoSiteDTO = (AlfrescoSiteDTO) o;
        if (alfrescoSiteDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alfrescoSiteDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlfrescoSiteDTO{" +
            "id=" + getId() +
            ", guid='" + getGuid() + "'" +
            ", identify='" + getIdentify() + "'" +
            ", role='" + getRole() + "'" +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", visibility='" + getVisibility() + "'" +
            "}";
    }
}
