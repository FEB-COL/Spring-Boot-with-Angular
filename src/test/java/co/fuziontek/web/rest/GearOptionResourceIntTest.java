package co.fuziontek.web.rest;

import co.fuziontek.GeargatewayApp;

import co.fuziontek.domain.GearOption;
import co.fuziontek.repository.GearOptionRepository;
import co.fuziontek.service.GearOptionService;
import co.fuziontek.service.dto.GearOptionDTO;
import co.fuziontek.service.mapper.GearOptionMapper;
import co.fuziontek.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static co.fuziontek.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the GearOptionResource REST controller.
 *
 * @see GearOptionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = GeargatewayApp.class)
public class GearOptionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private GearOptionRepository gearOptionRepository;

    @Autowired
    private GearOptionMapper gearOptionMapper;

    @Autowired
    private GearOptionService gearOptionService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restGearOptionMockMvc;

    private GearOption gearOption;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final GearOptionResource gearOptionResource = new GearOptionResource(gearOptionService);
        this.restGearOptionMockMvc = MockMvcBuilders.standaloneSetup(gearOptionResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static GearOption createEntity(EntityManager em) {
        GearOption gearOption = new GearOption()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return gearOption;
    }

    @Before
    public void initTest() {
        gearOption = createEntity(em);
    }

    @Test
    @Transactional
    public void createGearOption() throws Exception {
        int databaseSizeBeforeCreate = gearOptionRepository.findAll().size();

        // Create the GearOption
        GearOptionDTO gearOptionDTO = gearOptionMapper.toDto(gearOption);
        restGearOptionMockMvc.perform(post("/api/gear-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOptionDTO)))
            .andExpect(status().isCreated());

        // Validate the GearOption in the database
        List<GearOption> gearOptionList = gearOptionRepository.findAll();
        assertThat(gearOptionList).hasSize(databaseSizeBeforeCreate + 1);
        GearOption testGearOption = gearOptionList.get(gearOptionList.size() - 1);
        assertThat(testGearOption.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testGearOption.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createGearOptionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = gearOptionRepository.findAll().size();

        // Create the GearOption with an existing ID
        gearOption.setId(1L);
        GearOptionDTO gearOptionDTO = gearOptionMapper.toDto(gearOption);

        // An entity with an existing ID cannot be created, so this API call must fail
        restGearOptionMockMvc.perform(post("/api/gear-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearOption in the database
        List<GearOption> gearOptionList = gearOptionRepository.findAll();
        assertThat(gearOptionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllGearOptions() throws Exception {
        // Initialize the database
        gearOptionRepository.saveAndFlush(gearOption);

        // Get all the gearOptionList
        restGearOptionMockMvc.perform(get("/api/gear-options?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(gearOption.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())));
    }
    
    @Test
    @Transactional
    public void getGearOption() throws Exception {
        // Initialize the database
        gearOptionRepository.saveAndFlush(gearOption);

        // Get the gearOption
        restGearOptionMockMvc.perform(get("/api/gear-options/{id}", gearOption.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(gearOption.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingGearOption() throws Exception {
        // Get the gearOption
        restGearOptionMockMvc.perform(get("/api/gear-options/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateGearOption() throws Exception {
        // Initialize the database
        gearOptionRepository.saveAndFlush(gearOption);

        int databaseSizeBeforeUpdate = gearOptionRepository.findAll().size();

        // Update the gearOption
        GearOption updatedGearOption = gearOptionRepository.findById(gearOption.getId()).get();
        // Disconnect from session so that the updates on updatedGearOption are not directly saved in db
        em.detach(updatedGearOption);
        updatedGearOption
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        GearOptionDTO gearOptionDTO = gearOptionMapper.toDto(updatedGearOption);

        restGearOptionMockMvc.perform(put("/api/gear-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOptionDTO)))
            .andExpect(status().isOk());

        // Validate the GearOption in the database
        List<GearOption> gearOptionList = gearOptionRepository.findAll();
        assertThat(gearOptionList).hasSize(databaseSizeBeforeUpdate);
        GearOption testGearOption = gearOptionList.get(gearOptionList.size() - 1);
        assertThat(testGearOption.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testGearOption.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingGearOption() throws Exception {
        int databaseSizeBeforeUpdate = gearOptionRepository.findAll().size();

        // Create the GearOption
        GearOptionDTO gearOptionDTO = gearOptionMapper.toDto(gearOption);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restGearOptionMockMvc.perform(put("/api/gear-options")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(gearOptionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the GearOption in the database
        List<GearOption> gearOptionList = gearOptionRepository.findAll();
        assertThat(gearOptionList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteGearOption() throws Exception {
        // Initialize the database
        gearOptionRepository.saveAndFlush(gearOption);

        int databaseSizeBeforeDelete = gearOptionRepository.findAll().size();

        // Get the gearOption
        restGearOptionMockMvc.perform(delete("/api/gear-options/{id}", gearOption.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<GearOption> gearOptionList = gearOptionRepository.findAll();
        assertThat(gearOptionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearOption.class);
        GearOption gearOption1 = new GearOption();
        gearOption1.setId(1L);
        GearOption gearOption2 = new GearOption();
        gearOption2.setId(gearOption1.getId());
        assertThat(gearOption1).isEqualTo(gearOption2);
        gearOption2.setId(2L);
        assertThat(gearOption1).isNotEqualTo(gearOption2);
        gearOption1.setId(null);
        assertThat(gearOption1).isNotEqualTo(gearOption2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(GearOptionDTO.class);
        GearOptionDTO gearOptionDTO1 = new GearOptionDTO();
        gearOptionDTO1.setId(1L);
        GearOptionDTO gearOptionDTO2 = new GearOptionDTO();
        assertThat(gearOptionDTO1).isNotEqualTo(gearOptionDTO2);
        gearOptionDTO2.setId(gearOptionDTO1.getId());
        assertThat(gearOptionDTO1).isEqualTo(gearOptionDTO2);
        gearOptionDTO2.setId(2L);
        assertThat(gearOptionDTO1).isNotEqualTo(gearOptionDTO2);
        gearOptionDTO1.setId(null);
        assertThat(gearOptionDTO1).isNotEqualTo(gearOptionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(gearOptionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(gearOptionMapper.fromId(null)).isNull();
    }
}
