package co.fuziontek.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A GearDiagAnswer.
 */
@Entity
@Table(name = "gear_diag_answer")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class GearDiagAnswer implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "answer")
    private Double answer;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @Column(name = "jhi_comment")
    private String comment;

    @ManyToOne
    @JsonIgnoreProperties("gearDiagAnswers")
    private GearDiagQuestion gearDiagquestion;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAnswer() {
        return answer;
    }

    public GearDiagAnswer answer(Double answer) {
        this.answer = answer;
        return this;
    }

    public void setAnswer(Double answer) {
        this.answer = answer;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public GearDiagAnswer creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public String getComment() {
        return comment;
    }

    public GearDiagAnswer comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public GearDiagQuestion getGearDiagquestion() {
        return gearDiagquestion;
    }

    public GearDiagAnswer gearDiagquestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagquestion = gearDiagQuestion;
        return this;
    }

    public void setGearDiagquestion(GearDiagQuestion gearDiagQuestion) {
        this.gearDiagquestion = gearDiagQuestion;
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
        GearDiagAnswer gearDiagAnswer = (GearDiagAnswer) o;
        if (gearDiagAnswer.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), gearDiagAnswer.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "GearDiagAnswer{" +
            "id=" + getId() +
            ", answer=" + getAnswer() +
            ", creationDate='" + getCreationDate() + "'" +
            ", comment='" + getComment() + "'" +
            "}";
    }
}
