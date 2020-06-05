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
 * A AlfrescoSite.
 */
@Entity
@Table(name = "alfresco_site")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AlfrescoSite implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "guid")
    private String guid;

    @Column(name = "identify")
    private String identify;

    @Column(name = "jhi_role")
    private String role;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "visibility")
    private String visibility;

    @OneToMany(mappedBy = "alfrescoSite")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<AfrescoNode> alfrescoNodes = new HashSet<>();
    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGuid() {
        return guid;
    }

    public AlfrescoSite guid(String guid) {
        this.guid = guid;
        return this;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public String getIdentify() {
        return identify;
    }

    public AlfrescoSite identify(String identify) {
        this.identify = identify;
        return this;
    }

    public void setIdentify(String identify) {
        this.identify = identify;
    }

    public String getRole() {
        return role;
    }

    public AlfrescoSite role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getTitle() {
        return title;
    }

    public AlfrescoSite title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public AlfrescoSite description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getVisibility() {
        return visibility;
    }

    public AlfrescoSite visibility(String visibility) {
        this.visibility = visibility;
        return this;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public Set<AfrescoNode> getAlfrescoNodes() {
        return alfrescoNodes;
    }

    public AlfrescoSite alfrescoNodes(Set<AfrescoNode> afrescoNodes) {
        this.alfrescoNodes = afrescoNodes;
        return this;
    }

    public AlfrescoSite addAlfrescoNode(AfrescoNode afrescoNode) {
        this.alfrescoNodes.add(afrescoNode);
        afrescoNode.setAlfrescoSite(this);
        return this;
    }

    public AlfrescoSite removeAlfrescoNode(AfrescoNode afrescoNode) {
        this.alfrescoNodes.remove(afrescoNode);
        afrescoNode.setAlfrescoSite(null);
        return this;
    }

    public void setAlfrescoNodes(Set<AfrescoNode> afrescoNodes) {
        this.alfrescoNodes = afrescoNodes;
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
        AlfrescoSite alfrescoSite = (AlfrescoSite) o;
        if (alfrescoSite.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), alfrescoSite.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AlfrescoSite{" +
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
