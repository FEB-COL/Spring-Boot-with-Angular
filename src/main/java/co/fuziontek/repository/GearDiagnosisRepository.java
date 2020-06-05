package co.fuziontek.repository;

import co.fuziontek.domain.GearDiagnosis;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDiagnosis entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDiagnosisRepository extends JpaRepository<GearDiagnosis, Long> {

}
