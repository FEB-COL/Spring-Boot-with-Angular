package co.fuziontek.repository;

import co.fuziontek.domain.GearRiskLog;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearRiskLog entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearRiskLogRepository extends JpaRepository<GearRiskLog, Long> {

}
