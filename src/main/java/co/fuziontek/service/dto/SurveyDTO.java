package co.fuziontek.service.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class SurveyDTO implements Serializable {

    private Long id;

    private String title;

    private String description;

    private LocalDate start;

    private LocalDate end;

    private Long gearOrganizationalUnitId;

    private String gearOrganizationalUnitName;

    private Long idUser;

    private String nameUser;

    private SurveyQuestionDTO[] questions;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public LocalDate getStart() {
        return start;
    }

    public void setStart(LocalDate start) {
        this.start = start;
    }

    public LocalDate getEnd() {
        return end;
    }

    public void setEnd(LocalDate end) {
        this.end = end;
    }

    public SurveyQuestionDTO[] getQuestions() {
        return questions;
    }

    public void setQuestions(SurveyQuestionDTO[] questions) {
        this.questions = questions;
    }

    public Long getIdUser() {
        return idUser;
    }

    public void setIdUser(Long idUser) {
        this.idUser = idUser;
    }


    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
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
}
