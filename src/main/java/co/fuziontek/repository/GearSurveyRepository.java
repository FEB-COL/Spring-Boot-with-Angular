package co.fuziontek.repository;

import co.fuziontek.domain.GearSurvey;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * Spring Data  repository for the GearSurvey entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearSurveyRepository extends JpaRepository<GearSurvey, Long> {

    List<GearSurvey> findByGearOrganizationalUnit_Id(Long organizationalUnitId);

}
