package co.fuziontek.repository;

import co.fuziontek.domain.GearDiagAnswer;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the GearDiagAnswer entity.
 */
@SuppressWarnings("unused")
@Repository
public interface GearDiagAnswerRepository extends JpaRepository<GearDiagAnswer, Long> {

}
