package co.fuziontek.repository;

import co.fuziontek.domain.GearSurveyQuestion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearSurveyQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSurveyQuestionRepository extends JpaRepository<GearSurveyQuestion, Long> {
    List<GearSurveyQuestion> findByGearsurveyId(Long surveyId);
    void deleteByGearsurveyId(Long surveyId);
}
