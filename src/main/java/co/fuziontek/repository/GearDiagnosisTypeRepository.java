package co.fuziontek.repository;

import co.fuziontek.domain.GearDiagnosisType;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDiagnosisType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDiagnosisTypeRepository extends JpaRepository<GearDiagnosisType, Long> {

}
