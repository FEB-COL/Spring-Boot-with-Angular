package co.fuziontek.repository;

import co.fuziontek.domain.GearSurveyAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearSurveyAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSurveyAnswerRepository extends JpaRepository<GearSurveyAnswer, Long> {
    List<GearSurveyAnswer> findByGearsurveyquestionId(Long questionId);
    void deleteByGearsurveyquestionId(Long questionId);
}
