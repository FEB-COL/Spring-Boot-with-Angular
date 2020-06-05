package co.fuziontek.repository;

import co.fuziontek.domain.GearSurveyQuestionType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearSurveyQuestionType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSurveyQuestionTypeRepository extends JpaRepository<GearSurveyQuestionType, Long> {

}
