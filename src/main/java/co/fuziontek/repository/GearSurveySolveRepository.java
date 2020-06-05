package co.fuziontek.repository;

import co.fuziontek.domain.GearSurveySolve;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearSurveySolve entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSurveySolveRepository extends JpaRepository<GearSurveySolve, Long> {
    void deleteByGearsurveyId(Long surveyId);
    List<GearSurveySolve> findByGearsurvey_Id(Long gearsurveyId);
}
